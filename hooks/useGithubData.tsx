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
  language: string,
  sortBy: SortBy,
  orderBy: OrderBy,
  page: number
) => {
  const dispatch = useDispatch();

  const queryKey = useMemo(
    () => ['githubSearchRepos', searchTerm, language, sortBy, orderBy, page],
    [searchTerm, language, sortBy, orderBy, page]
  );

  const { data, isError, error, isLoading } = useQuery({
    queryKey,
    queryFn: () =>
      fetchGithubRepos(searchTerm, language, sortBy, orderBy, page).then((data) => {
        dispatch(setTotalPages(data.totalPages)); // Dispatching the totalPage count here after data is fetched
        return data;
      }),
    staleTime: 300000,
  });

  return { items: data?.items, isLoading, isError, error };
};

export default useGithubData;
