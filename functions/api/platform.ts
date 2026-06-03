import type { PagesContext } from '../_shared/bindings';
import { jsonResponse } from '../_shared/http';

export async function onRequest({ env }: PagesContext) {
  let d1Ready = Boolean(env.DB);
  let r2Ready = Boolean(env.REPO_BUCKET);

  if (env.DB) {
    try {
      await env.DB.prepare('SELECT 1').first();
    } catch {
      d1Ready = false;
    }
  }

  if (env.REPO_BUCKET) {
    try {
      await env.REPO_BUCKET.list({ limit: 1 });
    } catch {
      r2Ready = false;
    }
  }

  return jsonResponse({
    cloudflare: true,
    d1: d1Ready,
    r2: r2Ready,
    clerk: Boolean(env.CLERK_JWKS_URL),
  });
}
