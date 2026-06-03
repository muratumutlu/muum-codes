import type { PagesContext } from '../_shared/bindings';
import { requireClerkUser } from '../_shared/clerk';
import { jsonResponse, methodNotAllowed, readJsonBody } from '../_shared/http';

interface RepositoryPayload {
  repo?: {
    id?: number;
    full_name?: string;
    html_url?: string;
    svn_url?: string;
    description?: string | null;
    language?: string | null;
    stargazers_count?: number;
    forks?: number;
    updated_at?: string;
    owner?: {
      login?: string;
      avatar_url?: string;
    };
  };
  repoId?: number;
}

function requireBindings({ env }: PagesContext) {
  if (!env.DB || !env.REPO_BUCKET) {
    return jsonResponse(
      { error: 'Cloudflare D1 and R2 bindings are required' },
      { status: 503 },
    );
  }
  return null;
}

async function handleGet(context: PagesContext, userId: string) {
  const result = await context.env
    .DB!.prepare(
      `SELECT
      repo_id AS repoId,
      full_name AS fullName,
      html_url AS htmlUrl,
      description,
      language,
      stars,
      forks,
      owner_login AS ownerLogin,
      owner_avatar_url AS ownerAvatarUrl,
      github_updated_at AS githubUpdatedAt,
      updated_at AS savedAt
    FROM saved_repositories
    WHERE user_id = ?
    ORDER BY updated_at DESC
    LIMIT 100`,
    )
    .bind(userId)
    .all();

  return jsonResponse({ repositories: result.results ?? [] });
}

async function handlePost(context: PagesContext, userId: string) {
  const body = await readJsonBody<RepositoryPayload>(context.request);
  const repo = body?.repo;

  if (!repo?.id || !repo.full_name || !(repo.html_url || repo.svn_url)) {
    return jsonResponse(
      { error: 'Repository payload is incomplete' },
      { status: 400 },
    );
  }

  const now = new Date().toISOString();
  const htmlUrl = repo.html_url ?? repo.svn_url;
  const snapshotKey = `repositories/${userId}/${repo.id}.json`;

  await context.env
    .DB!.prepare(
      `INSERT INTO saved_repositories (
      user_id,
      repo_id,
      full_name,
      html_url,
      description,
      language,
      stars,
      forks,
      owner_login,
      owner_avatar_url,
      github_updated_at,
      created_at,
      updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(user_id, repo_id) DO UPDATE SET
      full_name = excluded.full_name,
      html_url = excluded.html_url,
      description = excluded.description,
      language = excluded.language,
      stars = excluded.stars,
      forks = excluded.forks,
      owner_login = excluded.owner_login,
      owner_avatar_url = excluded.owner_avatar_url,
      github_updated_at = excluded.github_updated_at,
      updated_at = excluded.updated_at`,
    )
    .bind(
      userId,
      repo.id,
      repo.full_name,
      htmlUrl,
      repo.description ?? null,
      repo.language ?? null,
      repo.stargazers_count ?? 0,
      repo.forks ?? 0,
      repo.owner?.login ?? null,
      repo.owner?.avatar_url ?? null,
      repo.updated_at ?? null,
      now,
      now,
    )
    .run();

  await context.env.REPO_BUCKET!.put(
    snapshotKey,
    JSON.stringify({ savedAt: now, repo }, null, 2),
    { httpMetadata: { contentType: 'application/json' } },
  );

  return jsonResponse({ saved: true, snapshotKey });
}

async function handleDelete(context: PagesContext, userId: string) {
  const body = await readJsonBody<RepositoryPayload>(context.request);
  const repoId = body?.repoId;

  if (!repoId) {
    return jsonResponse({ error: 'repoId is required' }, { status: 400 });
  }

  await context.env
    .DB!.prepare(
      'DELETE FROM saved_repositories WHERE user_id = ? AND repo_id = ?',
    )
    .bind(userId, repoId)
    .run();
  await context.env.REPO_BUCKET!.delete(
    `repositories/${userId}/${repoId}.json`,
  );

  return jsonResponse({ deleted: true });
}

export async function onRequest(context: PagesContext) {
  const missingBindingResponse = requireBindings(context);
  if (missingBindingResponse) return missingBindingResponse;

  const user = await requireClerkUser(context.request, context.env);
  if (user instanceof Response) return user;

  if (context.request.method === 'GET') return handleGet(context, user.userId);
  if (context.request.method === 'POST')
    return handlePost(context, user.userId);
  if (context.request.method === 'DELETE') {
    return handleDelete(context, user.userId);
  }

  return methodNotAllowed();
}
