export type SortBy = "stars" | "forks" | "lastUpdate";
export type SearchTerm = string | undefined;
export type OrderBy = "asc" | "desc";

export interface FilterState {
	language: string;
	searchTerm?: SearchTerm;
	sortBy: SortBy;
	orderBy: OrderBy;
	currentPage: number;
	totalPages: number;
}
