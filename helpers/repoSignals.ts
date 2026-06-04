import type { GithubRepository } from '@/types/GithubRepo.types';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export interface RepoSignalDimension {
  key:
    | 'momentum'
    | 'maintainer'
    | 'docs'
    | 'issueHealth'
    | 'agentFit'
    | 'license';
  label: string;
  score: number;
  evidence: string;
}

export interface RepoSignalAssessment {
  score: number;
  grade: 'Prime' | 'Strong' | 'Watch' | 'Risk';
  summary: string;
  dimensions: RepoSignalDimension[];
}

const clampScore = (value: number) => Math.max(0, Math.min(100, value));

const daysSince = (date: string | undefined) => {
  if (!date) return Number.POSITIVE_INFINITY;

  const timestamp = new Date(date).getTime();

  if (Number.isNaN(timestamp)) return Number.POSITIVE_INFINITY;

  return Math.max(0, Math.floor((Date.now() - timestamp) / DAY_IN_MS));
};

const scoreRecency = (date: string | undefined) => {
  const days = daysSince(date);

  if (days <= 7) return 98;
  if (days <= 30) return 88;
  if (days <= 90) return 74;
  if (days <= 180) return 58;
  if (days <= 365) return 38;

  return 16;
};

const compactDateEvidence = (date: string | undefined) => {
  const days = daysSince(date);

  if (!Number.isFinite(days)) return 'no public activity date';
  if (days === 0) return 'activity today';
  if (days === 1) return 'activity yesterday';
  if (days < 30) return `activity ${days} days ago`;

  const months = Math.round(days / 30);

  if (months < 12) return `activity ${months} months ago`;

  return `activity ${Math.round(days / 365)} years ago`;
};

const getTextCorpus = (repo: GithubRepository) =>
  [
    repo.name,
    repo.full_name,
    repo.description,
    repo.homepage,
    repo.language,
    ...(repo.topics ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

const getAgentKeywordMatches = (repo: GithubRepository) => {
  const corpus = getTextCorpus(repo);
  const keywords = [
    'agent',
    'agents',
    'ai',
    'openai',
    'gpt',
    'llm',
    'mcp',
    'eval',
    'evaluation',
    'tool',
    'tools',
    'workflow',
    'automation',
    'rag',
    'vector',
    'embedding',
    'chat',
    'assistant',
    'orchestration',
    'observability',
  ];

  return keywords.filter((keyword) => corpus.includes(keyword));
};

const getAgeMonths = (date: string | undefined) => {
  const days = daysSince(date);

  if (!Number.isFinite(days)) return 36;

  return Math.max(1, days / 30);
};

export const getRepoSignalAssessment = (
  repo: GithubRepository,
  options: { hasReadme?: boolean } = {},
): RepoSignalAssessment => {
  const stars = repo.stargazers_count ?? 0;
  const forks = repo.forks ?? 0;
  const issues = repo.open_issues_count ?? 0;
  const ageMonths = getAgeMonths(repo.created_at);
  const starVelocity = stars / ageMonths;
  const issueRatio = issues / Math.max(stars, 50);
  const topics = repo.topics ?? [];
  const keywordMatches = getAgentKeywordMatches(repo);
  const recencyScore = Math.max(
    scoreRecency(repo.pushed_at),
    scoreRecency(repo.updated_at),
  );

  const momentumScore = clampScore(
    Math.log10(starVelocity + 1) * 28 +
      Math.log10(forks + 1) * 8 +
      recencyScore * 0.35,
  );

  const maintainerScore = clampScore(
    recencyScore * 0.72 +
      (issueRatio <= 0.01
        ? 22
        : issueRatio <= 0.04
          ? 14
          : issueRatio <= 0.1
            ? 7
            : 0),
  );

  const docsScore = clampScore(
    (repo.description ? 18 : 0) +
      (repo.homepage ? 14 : 0) +
      (repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION'
        ? 8
        : 0) +
      Math.min(topics.length * 5, 25) +
      (options.hasReadme ? 35 : options.hasReadme === false ? 0 : 18),
  );

  const issueHealthScore = clampScore(
    issueRatio <= 0.002
      ? 96
      : issueRatio <= 0.01
        ? 84
        : issueRatio <= 0.03
          ? 68
          : issueRatio <= 0.08
            ? 48
            : 24,
  );

  const agentFitScore = clampScore(
    keywordMatches.length * 13 +
      (['typescript', 'javascript', 'python', 'go', 'rust'].includes(
        repo.language?.toLowerCase() ?? '',
      )
        ? 12
        : 0) +
      (repo.homepage ? 8 : 0) +
      Math.min(topics.length * 2, 12),
  );

  const licenseScore = clampScore(
    repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION' ? 92 : 34,
  );

  const dimensions: RepoSignalDimension[] = [
    {
      key: 'momentum',
      label: 'Momentum',
      score: Math.round(momentumScore),
      evidence: `${Math.round(starVelocity).toLocaleString('en-US')} stars/month proxy`,
    },
    {
      key: 'maintainer',
      label: 'Maintainer',
      score: Math.round(maintainerScore),
      evidence: compactDateEvidence(repo.pushed_at ?? repo.updated_at),
    },
    {
      key: 'docs',
      label: 'Docs readiness',
      score: Math.round(docsScore),
      evidence: options.hasReadme
        ? 'README, metadata, topics checked'
        : 'README signal pending or missing',
    },
    {
      key: 'issueHealth',
      label: 'Issue health',
      score: Math.round(issueHealthScore),
      evidence: `${issues.toLocaleString('en-US')} open issues`,
    },
    {
      key: 'agentFit',
      label: 'Agent fit',
      score: Math.round(agentFitScore),
      evidence: keywordMatches.length
        ? keywordMatches.slice(0, 4).join(', ')
        : 'no agent keywords detected',
    },
    {
      key: 'license',
      label: 'License clarity',
      score: Math.round(licenseScore),
      evidence: repo.license?.spdx_id ?? repo.license?.name ?? 'no license',
    },
  ];

  const weightedScore = Math.round(
    dimensions.reduce((total, dimension) => {
      const weight =
        dimension.key === 'momentum'
          ? 0.2
          : dimension.key === 'maintainer'
            ? 0.22
            : dimension.key === 'docs'
              ? 0.2
              : dimension.key === 'issueHealth'
                ? 0.16
                : dimension.key === 'agentFit'
                  ? 0.16
                  : 0.06;

      return total + dimension.score * weight;
    }, 0),
  );

  const grade =
    weightedScore >= 82
      ? 'Prime'
      : weightedScore >= 66
        ? 'Strong'
        : weightedScore >= 48
          ? 'Watch'
          : 'Risk';

  const strongestDimension = [...dimensions].sort(
    (first, second) => second.score - first.score,
  )[0];

  return {
    score: weightedScore,
    grade,
    summary: `${strongestDimension.label} is the strongest current signal.`,
    dimensions,
  };
};
