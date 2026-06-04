/* eslint-disable import/order */
import {
  CloudflareReadiness,
  CustomCard,
  Filter,
  Hero,
  HomePageTemplate,
  MetaTags,
  RepoTable,
  SearchInput,
} from '@/components';
import { githubLanguages, predefinedSearchTerms } from '@/data/filterOptions';
import {
  selectFilter,
  setCurrentPage,
  setLanguages,
  setSearchTerm,
} from '@/store/filter/filterSlice';
import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { IconFilter, IconSparkles } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './index.module.css';

export default function HomePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter) as ReturnType<
    typeof selectFilter
  > & {
    language?: string;
  };
  const { searchTerm } = filter;
  const activeLanguages = Array.isArray(filter.languages)
    ? filter.languages
    : [filter.language ?? 'javascript'];

  useEffect(() => {
    const query = router.query.q ?? router.query.mission;

    if (
      !router.isReady ||
      Array.isArray(query) ||
      !query ||
      searchTerm === query
    ) {
      return;
    }

    dispatch(setSearchTerm(query));
    dispatch(setCurrentPage(1));
  }, [
    dispatch,
    router.isReady,
    router.query.mission,
    router.query.q,
    searchTerm,
  ]);

  const handleFilterChange = (value: string[]) => {
    dispatch(setLanguages(value));
    dispatch(setCurrentPage(1));
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
    dispatch(setCurrentPage(1));
  };

  return (
    <HomePageTemplate>
      <MetaTags type="homepage" />
      <Hero />

      <Paper id="workspace" component="section" className={classes.console}>
        <Stack gap="xl">
          <Group justify="space-between" align="flex-start" gap="lg">
            <div>
              <Text className={classes.eyebrow}>Search console</Text>
              <Title className={classes.consoleTitle}>
                Scout the repos your AI stack should know.
              </Title>
            </div>
            <Text className={classes.consoleCopy}>
              Search the open-source frontier, lock in a language, then save the
              strongest signals into your private workspace.
            </Text>
          </Group>

          <section className={classes.searchCard}>
            <Stack gap="md">
              <SearchInput value={searchTerm} onChange={handleSearchChange} />

              <div className={classes.primaryTerritories}>
                <Group justify="space-between" align="center" gap="md">
                  <Group gap={8}>
                    <IconSparkles size={16} className={classes.sectionIcon} />
                    <Text className={classes.label}>
                      Start with an agent territory
                    </Text>
                  </Group>
                  <Text className={classes.helperText}>
                    Primary way to search.
                  </Text>
                </Group>
                <Group gap={8}>
                  {predefinedSearchTerms.map((term) => (
                    <Button
                      className={classes.topicButton}
                      variant={searchTerm === term.value ? 'filled' : 'outline'}
                      key={term.label}
                      onClick={() => handleSearchChange(term.value)}
                    >
                      {term.label}
                    </Button>
                  ))}
                </Group>
              </div>

              <div className={classes.compactFilterBar}>
                <Group gap={8}>
                  <IconFilter size={16} className={classes.sectionIcon} />
                  <Text className={classes.label}>Language filters</Text>
                </Group>
                <div className={classes.filterDropdown}>
                  <Filter
                    options={githubLanguages}
                    onChange={handleFilterChange}
                    value={activeLanguages}
                  />
                </div>
              </div>
            </Stack>
          </section>
        </Stack>
      </Paper>

      <CloudflareReadiness />

      {searchTerm && (
        <CustomCard>
          <Title className={classes.resultsTitle}>
            {`${searchTerm} repositories ${
              activeLanguages.length > 0 &&
              `running on ${activeLanguages.join(', ')}`
            }`}
          </Title>
        </CustomCard>
      )}

      <div id="signals">
        <RepoTable />
      </div>
    </HomePageTemplate>
  );
}
