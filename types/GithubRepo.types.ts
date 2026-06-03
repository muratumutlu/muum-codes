export interface GithubRepository {
  id: number;
  full_name?: string;
  html_url?: string;
  svn_url?: string;
  description?: string | null;
  language?: string | null;
  stargazers_count: number;
  forks: number;
  updated_at: string;
  owner?: {
    login?: string;
    avatar_url?: string;
  };
}
