/* eslint-disable import/order */
import { useDispatch, useSelector } from 'react-redux';

import { CustomCard, Filter, Hero, HomePageTemplate, RepoTable, SearchInput } from '@/components';

import filterOptions from '@/data/filterOptions';
import { selectFilter, setFilter, setSearchTerm } from '@/store/filter/filterSlice';

export default function HomePage() {
  const { filter, searchTerm } = useSelector(selectFilter);
  const dispatch = useDispatch();

  const handleFilterChange = (value: string) => {
    dispatch(setFilter(value));
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <HomePageTemplate>
      <Hero />
      <CustomCard>
        <SearchInput value={searchTerm} onChange={handleSearchChange} />
      </CustomCard>
      <CustomCard>
        <Filter options={filterOptions} onChange={handleFilterChange} value={filter} />
      </CustomCard>
      <RepoTable />
    </HomePageTemplate>
  );
}
