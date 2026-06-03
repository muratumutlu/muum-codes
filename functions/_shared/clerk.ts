import type { CloudflareEnv } from './bindings';
import { jsonResponse } from './http';

interface JwtHeader {
  alg?: string;
  kid?: string;
}

interface JwtPayload {
  aud?: string | string[];
  exp?: number;
  iss?: string;
  nbf?: number;
  sub?: string;
}

interface JsonWebKeySet {
  keys?: ClerkJsonWebKey[];
}

interface ClerkJsonWebKey extends JsonWebKey {
  kid?: string;
}

export interface AuthenticatedUser {
  userId: string;
  claims: JwtPayload;
}

function base64UrlToBytes(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    '=',
  );
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function decodeJwtPart<T>(part: string): T {
  const bytes = base64UrlToBytes(part);
  const json = new TextDecoder().decode(bytes);
  return JSON.parse(json) as T;
}

function getBearerToken(request: Request) {
  const header = request.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) return null;
  return header.slice('Bearer '.length).trim();
}

function audienceMatches(
  claim: string | string[] | undefined,
  expected: string,
) {
  if (!claim) return false;
  if (Array.isArray(claim)) return claim.includes(expected);
  return claim === expected;
}

async function verifyToken(token: string, env: CloudflareEnv) {
  if (!env.CLERK_JWKS_URL) {
    throw new Error('CLERK_JWKS_URL is not configured');
  }

  const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');
  if (!encodedHeader || !encodedPayload || !encodedSignature) {
    throw new Error('Invalid token format');
  }

  const header = decodeJwtPart<JwtHeader>(encodedHeader);
  const payload = decodeJwtPart<JwtPayload>(encodedPayload);

  if (header.alg !== 'RS256' || !header.kid) {
    throw new Error('Unsupported token header');
  }

  const jwksResponse = await fetch(env.CLERK_JWKS_URL);
  if (!jwksResponse.ok) {
    throw new Error('Unable to fetch Clerk JWKS');
  }

  const jwks = (await jwksResponse.json()) as JsonWebKeySet;
  const jwk = jwks.keys?.find((key) => key.kid === header.kid);
  if (!jwk) {
    throw new Error('Signing key not found');
  }

  const key = await crypto.subtle.importKey(
    'jwk',
    jwk,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify'],
  );

  const verified = await crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5',
    key,
    base64UrlToBytes(encodedSignature),
    new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`),
  );

  if (!verified) {
    throw new Error('Invalid token signature');
  }

  const now = Math.floor(Date.now() / 1000);
  if (!payload.sub) throw new Error('Token has no subject');
  if (payload.exp && payload.exp <= now) throw new Error('Token has expired');
  if (payload.nbf && payload.nbf > now + 60)
    throw new Error('Token is not active');
  if (env.CLERK_JWT_ISSUER && payload.iss !== env.CLERK_JWT_ISSUER) {
    throw new Error('Invalid token issuer');
  }
  if (
    env.CLERK_JWT_AUDIENCE &&
    !audienceMatches(payload.aud, env.CLERK_JWT_AUDIENCE)
  ) {
    throw new Error('Invalid token audience');
  }

  return { userId: payload.sub, claims: payload };
}

export async function requireClerkUser(
  request: Request,
  env: CloudflareEnv,
): Promise<AuthenticatedUser | Response> {
  const token = getBearerToken(request);
  if (!token) {
    return jsonResponse({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    return await verifyToken(token, env);
  } catch (error) {
    return jsonResponse(
      {
        error: 'Invalid authentication token',
        detail: error instanceof Error ? error.message : 'Unknown auth error',
      },
      { status: 401 },
    );
  }
}
