export interface GithubRepository {
  id: number;
  name?: string;
  full_name?: string;
  html_url?: string;
  svn_url?: string;
  description?: string | null;
  language?: string | null;
  stargazers_count: number;
  watchers_count?: number;
  forks: number;
  open_issues_count?: number;
  updated_at: string;
  pushed_at?: string;
  created_at?: string;
  default_branch?: string;
  homepage?: string | null;
  topics?: string[];
  visibility?: string;
  license?: {
    name?: string;
    spdx_id?: string;
  } | null;
  owner?: {
    login?: string;
    avatar_url?: string;
    html_url?: string;
  };
}
