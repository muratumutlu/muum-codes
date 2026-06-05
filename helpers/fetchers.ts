import {
  GITHUB_API_REPOSITORY_README_PATH,
  GITHUB_API_REPOSITORY_URL,
  GITHUB_API_SEARCH_URL,
} from '@/constants/apiURLs';
import { MAX_PAGE_ITEMS } from '@/constants/magicNumbers';
import {
  FreshnessWindow,
  OrderBy,
  SearchTerm,
  SortBy,
} from '@/types/Filter.types';
import type { GithubRepository } from '@/types/GithubRepo.types';

const getFreshnessQualifier = (freshness: FreshnessWindow) => {
  if (freshness === 'any') return '';

  const days = Number.parseInt(freshness, 10);
  const date = new Date();
  date.setDate(date.getDate() - days);

  return `pushed:>=${date.toISOString().slice(0, 10)}`;
};

export const fetchGithubRepos = async (
  searchTerm: SearchTerm,
  languages: string[],
  sortBy: SortBy,
  orderBy: OrderBy,
  minStars = 0,
  freshness: FreshnessWindow = 'any',
  page = 1,
) => {
  const activeLanguages = languages.length > 0 ? languages : [''];
  const githubSort =
    sortBy === 'signal'
      ? 'stars'
      : sortBy === 'lastUpdate'
        ? 'updated'
        : sortBy;
  const starQualifier = minStars > 0 ? `stars:>=${minStars}` : '';
  const freshnessQualifier = getFreshnessQualifier(freshness);

  const buildQuery = (language: string) =>
    encodeURIComponent(
      [
        searchTerm,
        language && `language:${language}`,
        starQualifier,
        freshnessQualifier,
      ]
        .filter(Boolean)
        .join(' ') || 'stars:>0',
    );

  const responses = await Promise.all(
    activeLanguages.map((language) =>
      fetch(
        `${GITHUB_API_SEARCH_URL}?q=${buildQuery(language)}&sort=${githubSort}&order=${orderBy}&page=${page}&per_page=${MAX_PAGE_ITEMS}`,
      ),
    ),
  );

  if (responses.some((response) => !response.ok)) {
    throw new Error('Network response was not ok');
  }

  const payloads = await Promise.all(
    responses.map((response) => response.json()),
  );
  const reposById = new Map<number, GithubRepository>();

  payloads.forEach((payload) => {
    (payload.items as GithubRepository[]).forEach((repo) => {
      reposById.set(repo.id, repo);
    });
  });

  const totalItems = Math.min(
    payloads.reduce(
      (total, payload) => total + Number(payload?.total_count ?? 0),
      0,
    ),
    1000,
  );
  const totalPages = Math.ceil(totalItems / MAX_PAGE_ITEMS);

  return {
    items: Array.from(reposById.values()).slice(0, MAX_PAGE_ITEMS),
    totalPages,
  };
};

export const fetchGithubRepo = async (owner: string, repo: string) => {
  const response = await fetch(
    `${GITHUB_API_REPOSITORY_URL}/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
  );

  if (!response.ok) {
    throw new Error('Repository could not be loaded');
  }

  return (await response.json()) as GithubRepository;
};

export const fetchGithubReadmeHtml = async (owner: string, repo: string) => {
  const response = await fetch(
    `${GITHUB_API_REPOSITORY_URL}/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/${GITHUB_API_REPOSITORY_README_PATH}`,
    {
      headers: {
        Accept: 'application/vnd.github.html+json',
      },
    },
  );

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Repository README could not be loaded');
  }

  return response.text();
};
