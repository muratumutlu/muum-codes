/* eslint-disable import/order */
import {
  CustomCard,
  Filter,
  Hero,
  HomePageTemplate,
  MetaTags,
  RepoTable,
  SearchInput,
} from '@/components';
import filterOptions from '@/data/filterOptions';
import { selectFilter, setFilter, setSearchTerm } from '@/store/filter/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function HomePage() {
  const dispatch = useDispatch();
  const { filter, searchTerm } = useSelector(selectFilter);

  const handleFilterChange = (value: string) => {
    dispatch(setFilter(value));
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <HomePageTemplate>
      <MetaTags type="homepage" />
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
