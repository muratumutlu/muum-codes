/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/order */
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { fetchGithubRepos } from '@/helpers/fetchers';
import { setTotalPages } from '@/store/filter/filterSlice';
import type { OrderBy, SearchTerm, SortBy } from '@/types/Filter.types';
import { useDispatch } from 'react-redux';

export const useGithubData = (
  searchTerm: SearchTerm,
  languages: string[],
  sortBy: SortBy,
  orderBy: OrderBy,
  page: number,
) => {
  const dispatch = useDispatch();
  const languageKey = languages.join(',');

  const queryKey = useMemo(
    () => ['githubSearchRepos', searchTerm, languageKey, sortBy, orderBy, page],
    [searchTerm, languageKey, sortBy, orderBy, page],
  );

  const { data, isError, error, isLoading } = useQuery({
    queryKey,
    queryFn: () =>
      fetchGithubRepos(searchTerm, languages, sortBy, orderBy, page).then(
        (data) => {
          dispatch(setTotalPages(data.totalPages)); // Dispatching the totalPage count here after data is fetched
          return data;
        },
      ),
    staleTime: 300000,
  });

  return { items: data?.items, isLoading, isError, error };
};

export default useGithubData;
