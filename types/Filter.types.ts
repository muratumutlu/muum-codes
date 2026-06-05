export type SortBy = 'stars' | 'forks' | 'lastUpdate' | 'signal';
export type SearchTerm = string | undefined;
export type OrderBy = 'asc' | 'desc';
export type FreshnessWindow = 'any' | '7d' | '30d' | '90d';
export type SignalFilterKey =
  | 'active'
  | 'agentFit'
  | 'lowIssues'
  | 'licensed'
  | 'docs';

export interface FilterState {
  languages: string[];
  searchTerm?: SearchTerm;
  sortBy: SortBy;
  orderBy: OrderBy;
  minStars: number;
  freshness: FreshnessWindow;
  signalFilters: SignalFilterKey[];
  currentPage: number;
  totalPages: number;
}
