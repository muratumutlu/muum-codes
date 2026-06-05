/* eslint-disable import/order */
import {
  CloudflareReadiness,
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
  setFreshness,
  setLanguages,
  setMinStars,
  setOrderBy,
  setSearchTerm,
  setSignalFilters,
  setSortBy,
} from '@/store/filter/filterSlice';
import type {
  FreshnessWindow,
  SignalFilterKey,
  SortBy,
} from '@/types/Filter.types';
import {
  Button,
  Checkbox,
  Group,
  NumberInput,
  Paper,
  Popover,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconFilter, IconLayoutGrid, IconSparkles } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './index.module.css';

const signalFilterOptions: {
  label: string;
  value: SignalFilterKey;
  description: string;
}[] = [
  {
    label: 'Active maintenance',
    value: 'active',
    description: 'Pushed or updated in the last 90 days',
  },
  {
    label: 'Agent keyword match',
    value: 'agentFit',
    description: 'Agent, MCP, RAG, eval, tool, or automation signals',
  },
  {
    label: 'Low issue load',
    value: 'lowIssues',
    description: 'Open issues are low relative to stars',
  },
  {
    label: 'Licensed',
    value: 'licensed',
    description: 'Public license metadata is available',
  },
  {
    label: 'Docs metadata',
    value: 'docs',
    description: 'Description, homepage, or topics are present',
  },
];

const sortOptions: { label: string; value: SortBy }[] = [
  { label: 'Signal score', value: 'signal' },
  { label: 'Stars', value: 'stars' },
  { label: 'Forks', value: 'forks' },
  { label: 'Recently updated', value: 'lastUpdate' },
];

const freshnessOptions: { label: string; value: FreshnessWindow }[] = [
  { label: 'Any', value: 'any' },
  { label: '7d', value: '7d' },
  { label: '30d', value: '30d' },
  { label: '90d', value: '90d' },
];

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
  const minStars = filter.minStars ?? 0;
  const freshness = filter.freshness ?? 'any';
  const signalFilters = filter.signalFilters ?? [];
  const sortBy = filter.sortBy ?? 'stars';
  const resultsLanguage = activeLanguages.length
    ? ` running on ${activeLanguages.join(', ')}`
    : '';
  const resultsTitle = searchTerm
    ? `${searchTerm} repositories${resultsLanguage}`
    : '';
  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label ?? 'Stars';
  const selectedFreshnessLabel =
    freshnessOptions.find((option) => option.value === freshness)?.label ??
    'Any';
  const activeFilterSummary = [
    ...activeLanguages.map(
      (language) =>
        githubLanguages.find((option) => option.value === language)?.label ??
        language,
    ),
    minStars > 0 ? `${minStars}+ stars` : null,
    freshness !== 'any' ? `Updated ${selectedFreshnessLabel}` : null,
    sortBy !== 'stars' ? `Sort: ${selectedSortLabel}` : null,
    ...signalFilters.map(
      (signalFilter) =>
        signalFilterOptions.find((option) => option.value === signalFilter)
          ?.label ?? signalFilter,
    ),
  ].filter(Boolean) as string[];

  useEffect(() => {
    const query = router.query.q ?? router.query.mission;

    if (!router.isReady || Array.isArray(query) || !query) {
      return;
    }

    dispatch(setSearchTerm(query));
    dispatch(setCurrentPage(1));
  }, [dispatch, router.isReady, router.query.mission, router.query.q]);

  const handleFilterChange = (value: string[]) => {
    dispatch(setLanguages(value));
    dispatch(setCurrentPage(1));
  };

  const handleMinStarsChange = (value: string | number) => {
    dispatch(
      setMinStars(typeof value === 'number' ? value : Number(value) || 0),
    );
    dispatch(setCurrentPage(1));
  };

  const handleFreshnessChange = (value: string) => {
    dispatch(setFreshness(value as FreshnessWindow));
    dispatch(setCurrentPage(1));
  };

  const handleSignalFilterChange = (value: SignalFilterKey) => {
    const nextFilters = signalFilters.includes(value)
      ? signalFilters.filter((filterValue) => filterValue !== value)
      : [...signalFilters, value];

    dispatch(setSignalFilters(nextFilters));
    dispatch(setCurrentPage(1));
  };

  const handleSortChange = (value: string | null) => {
    if (!value) return;

    dispatch(setSortBy(value as SortBy));
    dispatch(setOrderBy('desc'));
    dispatch(setCurrentPage(1));
  };

  const handleSearchChange = (value: string) => {
    dispatch(setSearchTerm(value));
    dispatch(setCurrentPage(1));
  };

  const handleTerritoryChange = (value: string) => {
    handleSearchChange(value);
    router.replace(`/?q=${encodeURIComponent(value)}#workspace`, undefined, {
      shallow: true,
      scroll: false,
    });
  };

  const handleResetFilters = () => {
    dispatch(setLanguages([]));
    dispatch(setMinStars(0));
    dispatch(setFreshness('any'));
    dispatch(setSignalFilters([]));
    dispatch(setSortBy('stars'));
    dispatch(setOrderBy('desc'));
    dispatch(setCurrentPage(1));
  };

  const filterChipItems = [
    ...activeLanguages.map((language) => ({
      tone: 'cyan',
      value: language,
      label: `Language: ${
        githubLanguages.find((option) => option.value === language)?.label ??
        language
      }`,
      onRemove: () =>
        handleFilterChange(
          activeLanguages.filter((languageValue) => languageValue !== language),
        ),
    })),
    ...(minStars > 0
      ? [
          {
            tone: 'magenta',
            value: 'min-stars',
            label: `Min stars: ${minStars}+`,
            onRemove: () => handleMinStarsChange(0),
          },
        ]
      : []),
    ...(freshness !== 'any'
      ? [
          {
            tone: 'cyan',
            value: 'freshness',
            label: `Updated: ${selectedFreshnessLabel}`,
            onRemove: () => handleFreshnessChange('any'),
          },
        ]
      : []),
    ...(sortBy !== 'stars'
      ? [
          {
            tone: 'yellow',
            value: 'sort',
            label: `Sort: ${selectedSortLabel}`,
            onRemove: () => handleSortChange('stars'),
          },
        ]
      : []),
    ...(signalFilters.length > 0
      ? [
          {
            tone: 'magenta',
            value: 'signals',
            label: `Signal Filters (${signalFilters.length})`,
            onRemove: () => dispatch(setSignalFilters([])),
          },
        ]
      : []),
  ];

  return (
    <HomePageTemplate>
      <MetaTags type="homepage" />
      <Hero />

      <Paper id="workspace" component="section" className={classes.console}>
        <Stack gap="xl">
          <Group className={classes.consoleHeader} align="flex-start" gap="lg">
            <div>
              <Text className={classes.eyebrow}>Search workspace</Text>
              <Title className={classes.consoleTitle}>
                Repository scouting console
              </Title>
            </div>
          </Group>

          <section className={classes.discoveryBoard}>
            <div className={classes.territoryRail}>
              <Group justify="space-between" align="center" gap="md">
                <Group gap={8}>
                  <IconSparkles size={16} className={classes.sectionIcon} />
                  <Text className={classes.label}>
                    Start with an agent territory
                  </Text>
                </Group>
                <Text className={classes.helperText}>Primary search path</Text>
              </Group>
              <Group gap={8}>
                {predefinedSearchTerms.map((term) => (
                  <Button
                    className={classes.topicButton}
                    variant={searchTerm === term.value ? 'filled' : 'outline'}
                    key={term.label}
                    onClick={() => handleTerritoryChange(term.value)}
                  >
                    {term.label}
                  </Button>
                ))}
              </Group>
            </div>

            <div className={classes.searchColumn}>
              <section className={classes.searchCard}>
                <SearchInput value={searchTerm} onChange={handleSearchChange} />
              </section>

              <section className={classes.refineBar}>
                <Button
                  className={classes.filterButton}
                  data-active={activeFilterSummary.length > 0 || undefined}
                  leftSection={<IconFilter size={15} />}
                  variant="outline"
                >
                  Filters
                  {activeFilterSummary.length > 0
                    ? ` (${activeFilterSummary.length})`
                    : ''}
                </Button>

                <Group className={classes.filterMenuGroup} gap={8}>
                  <Popover
                    classNames={{ dropdown: classes.filterMenuDropdown }}
                    position="bottom-start"
                    shadow="md"
                    width={360}
                  >
                    <Popover.Target>
                      <Button
                        className={classes.filterMenuButton}
                        data-active={activeLanguages.length > 0 || undefined}
                        variant="outline"
                      >
                        Language
                      </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Text className={classes.filterLabel}>Language</Text>
                      <Filter
                        options={githubLanguages}
                        onChange={handleFilterChange}
                        value={activeLanguages}
                      />
                    </Popover.Dropdown>
                  </Popover>

                  <Popover
                    classNames={{ dropdown: classes.filterMenuDropdown }}
                    position="bottom-start"
                    shadow="md"
                    width={240}
                  >
                    <Popover.Target>
                      <Button
                        className={classes.filterMenuButton}
                        data-active={minStars > 0 || undefined}
                        variant="outline"
                      >
                        Stars
                      </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <NumberInput
                        classNames={{
                          label: classes.filterLabel,
                          input: classes.numberInput,
                        }}
                        label="Minimum stars"
                        min={0}
                        onChange={handleMinStarsChange}
                        step={100}
                        value={minStars}
                      />
                      <Group gap={6} mt="sm">
                        {[0, 100, 500, 1000].map((value) => (
                          <button
                            className={classes.quickOption}
                            key={value}
                            onClick={() => handleMinStarsChange(value)}
                            type="button"
                          >
                            {value === 0 ? 'Any' : `${value}+`}
                          </button>
                        ))}
                      </Group>
                    </Popover.Dropdown>
                  </Popover>

                  <Popover
                    classNames={{ dropdown: classes.filterMenuDropdown }}
                    position="bottom-start"
                    shadow="md"
                    width={280}
                  >
                    <Popover.Target>
                      <Button
                        className={classes.filterMenuButton}
                        data-active={freshness !== 'any' || undefined}
                        variant="outline"
                      >
                        Updated
                      </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Text className={classes.filterLabel}>Updated</Text>
                      <div className={classes.filterOptionGrid}>
                        {freshnessOptions.map((option) => (
                          <button
                            className={classes.quickOption}
                            data-active={
                              freshness === option.value || undefined
                            }
                            key={option.value}
                            onClick={() => handleFreshnessChange(option.value)}
                            type="button"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </Popover.Dropdown>
                  </Popover>

                  <Popover
                    classNames={{ dropdown: classes.filterMenuDropdown }}
                    position="bottom-start"
                    shadow="md"
                    width={280}
                  >
                    <Popover.Target>
                      <Button
                        className={classes.filterMenuButton}
                        data-active={sortBy !== 'stars' || undefined}
                        variant="outline"
                      >
                        Sort by
                      </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Text className={classes.filterLabel}>Sort by</Text>
                      <div className={classes.sortMenuList}>
                        {sortOptions.map((option) => (
                          <button
                            className={classes.sortMenuItem}
                            data-active={sortBy === option.value || undefined}
                            key={option.value}
                            onClick={() => handleSortChange(option.value)}
                            type="button"
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </Popover.Dropdown>
                  </Popover>

                  <Popover
                    classNames={{ dropdown: classes.filterMenuDropdown }}
                    position="bottom-start"
                    shadow="md"
                    width={420}
                  >
                    <Popover.Target>
                      <Button
                        className={classes.filterMenuButton}
                        data-active={signalFilters.length > 0 || undefined}
                        variant="outline"
                      >
                        Signals
                      </Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Text className={classes.filterLabel}>
                        Signal filters
                      </Text>
                      <div className={classes.signalMenuList}>
                        {signalFilterOptions.map((option) => (
                          <Checkbox
                            checked={signalFilters.includes(option.value)}
                            classNames={{
                              root: classes.signalCheck,
                              label: classes.signalCheckLabel,
                              description: classes.signalCheckDescription,
                            }}
                            description={option.description}
                            key={option.value}
                            label={option.label}
                            onChange={() =>
                              handleSignalFilterChange(option.value)
                            }
                          />
                        ))}
                      </div>
                    </Popover.Dropdown>
                  </Popover>
                </Group>

                <Group className={classes.activeFilterList} gap={6}>
                  {filterChipItems.map((item) => (
                    <button
                      className={classes.filterChip}
                      data-tone={item.tone}
                      key={item.value}
                      onClick={item.onRemove}
                      type="button"
                    >
                      {item.label}
                      <span aria-hidden="true">x</span>
                    </button>
                  ))}
                </Group>

                <Group className={classes.filterActions} gap={10}>
                  <button
                    className={classes.resetLink}
                    onClick={handleResetFilters}
                    type="button"
                  >
                    Reset
                  </button>
                  <span className={classes.gridButton} aria-hidden="true">
                    <IconLayoutGrid size={17} />
                  </span>
                </Group>
              </section>
            </div>
          </section>

          <section className={classes.resultsPanel}>
            {searchTerm && (
              <Group className={classes.signalsHeader} gap="md">
                <Text className={classes.signalsTitle}>
                  03. Repository signals
                </Text>
                <Text className={classes.signalsCount}>{resultsTitle}</Text>
                <Text className={classes.liveData}>Live data</Text>
              </Group>
            )}

            <div id="signals">
              <RepoTable />
            </div>
          </section>
        </Stack>
      </Paper>

      <CloudflareReadiness />
    </HomePageTemplate>
  );
}
