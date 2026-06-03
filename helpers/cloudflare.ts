import type { GithubRepository } from '@/types/GithubRepo.types';

export interface PlatformStatus {
  cloudflare: boolean;
  d1: boolean;
  r2: boolean;
  clerk: boolean;
}

export async function fetchPlatformStatus() {
  const response = await fetch('/api/platform');

  if (!response.ok) {
    throw new Error('Cloudflare platform endpoint is unavailable');
  }

  return (await response.json()) as PlatformStatus;
}

export async function saveRepositoryToWorkspace(
  repo: GithubRepository,
  token: string,
) {
  const response = await fetch('/api/saved-repositories', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ repo }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(
      error?.detail ?? error?.error ?? 'Repository could not be saved',
    );
  }

  return response.json();
}
