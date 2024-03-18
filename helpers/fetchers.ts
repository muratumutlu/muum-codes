import { GITHUB_API_SEARCH_URL } from '@/constants/apiURLs';
import { MAX_PAGE_ITEMS } from '@/constants/magicNumbers';
import { OrderBy, SearchTerm, SortBy } from '@/types/Filter.types';

export const fetchGithubRepos = async (
  searchTerm: SearchTerm,
  language: string,
  sortBy: SortBy,
  orderBy: OrderBy,
  page = 1 // Add a page parameter with a default value
) => {
  // If the searchTerm is undefined, we will use the language as the search term
  const queryString = encodeURIComponent(`${searchTerm} language:${language}`);

  // Fetching the data from the GitHub API
  const response = await fetch(
    `${GITHUB_API_SEARCH_URL}?q=${queryString}&sort=${sortBy}&order=${orderBy}&page=${page}&per_page=${MAX_PAGE_ITEMS}`
  );

  console.log(
    `${GITHUB_API_SEARCH_URL}?q=${queryString}&sort=${sortBy}&order=${orderBy}&page=${page}&per_page=${MAX_PAGE_ITEMS}`,
    'URL'
  );

  // If the response is not ok, we will throw an error
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const json = await response.json();

  // If the totalItems > 1000 count we have to limit it to 1000 because of the GitHub API limitation
  const totalItems = json?.total_count > 1000 ? 1000 : json?.total_count;
  const totalPages = Math.ceil(totalItems / MAX_PAGE_ITEMS);

  return {
    items: json.items, // The array of repository objects
    totalPages, // The total page count of repositories matching the search criteria
  };
};
