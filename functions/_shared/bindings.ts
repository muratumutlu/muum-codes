export interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  error?: string;
}

export interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T | null>;
  all<T = unknown>(): Promise<D1Result<T>>;
  run(): Promise<D1Result>;
}

export interface D1Database {
  prepare(query: string): D1PreparedStatement;
}

export interface R2Bucket {
  put(
    key: string,
    value: string | ArrayBuffer | ReadableStream,
    options?: {
      httpMetadata?: {
        contentType?: string;
      };
    },
  ): Promise<unknown>;
  delete(key: string): Promise<void>;
  list(options?: { limit?: number; prefix?: string }): Promise<unknown>;
}

export interface CloudflareEnv {
  DB?: D1Database;
  REPO_BUCKET?: R2Bucket;
  CLERK_JWKS_URL?: string;
  CLERK_JWT_ISSUER?: string;
  CLERK_JWT_AUDIENCE?: string;
}

export interface PagesContext {
  request: Request;
  env: CloudflareEnv;
  waitUntil?: (promise: Promise<unknown>) => void;
}
