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
  setLanguage,
  setSearchTerm,
} from '@/store/filter/filterSlice';
import { Button, Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import classes from './index.module.css';

export default function HomePage() {
  const dispatch = useDispatch();
  const { language, searchTerm } = useSelector(selectFilter);

  const handleFilterChange = (value: string) => {
    dispatch(setLanguage(value));
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
  };

  return (
    <HomePageTemplate>
      <MetaTags type="homepage" />
      <Hero />

      <Paper id="workspace" component="section" className={classes.console}>
        <Stack gap="lg">
          <Group justify="space-between" align="flex-start" gap="lg">
            <div>
              <Text className={classes.eyebrow}>Mission control</Text>
              <Title className={classes.consoleTitle}>
                Scout the repos your AI stack should know.
              </Title>
            </div>
            <Text className={classes.consoleCopy}>
              Search the open-source frontier, lock in a language, then save the
              strongest signals into your private workspace.
            </Text>
          </Group>

          <SearchInput value={searchTerm} onChange={handleSearchChange} />

          <div>
            <Text className={classes.label}>High-signal territories</Text>
            <Group gap={10}>
              {predefinedSearchTerms.slice(0, 12).map((term) => (
                <Button
                  className={classes.topicButton}
                  variant={searchTerm === term.label ? 'filled' : 'outline'}
                  key={term.label}
                  onClick={() => handleSearchChange(term.label)}
                >
                  {term.label}
                </Button>
              ))}
            </Group>
          </div>

          <div>
            <Text className={classes.label}>Language lens</Text>
            <Filter
              options={githubLanguages}
              onChange={handleFilterChange}
              value={language}
            />
          </div>
        </Stack>
      </Paper>

      <CloudflareReadiness />

      {searchTerm && (
        <CustomCard>
          <Title className={classes.resultsTitle}>
            {`${searchTerm} repositories ${language && `running on ${language}`}`}
          </Title>
        </CustomCard>
      )}

      <div id="signals">
        <RepoTable />
      </div>
    </HomePageTemplate>
  );
}
