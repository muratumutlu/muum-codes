/* eslint-disable import/order */
import React from 'react';

import type { GithubRepository } from '@/types/GithubRepo.types';
import { getRepoSignalAssessment } from '@/helpers/repoSignals';
import { useGithubData } from '@/hooks';
import {
  Avatar,
  Badge,
  Center,
  Flex,
  Pagination,
  Skeleton,
  Table,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconArrowNarrowDown,
  IconArrowNarrowUp,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';

import { beautifyDate } from '@/utils/date';

import {
  selectFilter,
  setCurrentPage,
  setOrderBy,
  setSortBy,
} from '@/store/filter/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import classes from './RepoTable.module.css';

import { CustomCard, SaveRepositoryButton } from '@/components';
import type { SortBy } from '@/types/Filter.types';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const RESULTS_PER_PAGE = 30;

const formatCompactNumber = (value: number | undefined) =>
  Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    notation: 'compact',
  })
    .format(value ?? 0)
    .toLowerCase();

const getDaysSince = (date: string | undefined) => {
  if (!date) return Number.POSITIVE_INFINITY;

  const timestamp = new Date(date).getTime();
  if (Number.isNaN(timestamp)) return Number.POSITIVE_INFINITY;

  return Math.max(0, Math.floor((Date.now() - timestamp) / DAY_IN_MS));
};

const hasAgentFit = (repo: GithubRepository) => {
  const corpus = [
    repo.name,
    repo.full_name,
    repo.description,
    repo.homepage,
    ...(repo.topics ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

  return [
    'agent',
    'ai',
    'openai',
    'llm',
    'mcp',
    'eval',
    'tool',
    'rag',
    'vector',
    'automation',
    'workflow',
  ].some((keyword) => corpus.includes(keyword));
};

const RepoTable: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter) as ReturnType<
    typeof selectFilter
  > & {
    language?: string;
  };
  const {
    searchTerm,
    sortBy,
    orderBy,
    currentPage,
    totalPages,
    minStars = 0,
    freshness = 'any',
    signalFilters = [],
  } = filter;
  const activeLanguages = Array.isArray(filter.languages)
    ? filter.languages
    : [filter.language ?? 'javascript'];

  const { isLoading, items } = useGithubData(
    searchTerm,
    activeLanguages,
    sortBy as SortBy,
    orderBy,
    minStars,
    freshness,
    currentPage,
  );

  const handleRepoClick = (repo: GithubRepository) => {
    const [fallbackOwner, fallbackName] = repo.full_name?.split('/') ?? [];
    const owner = repo.owner?.login ?? fallbackOwner;
    const name = repo.name ?? fallbackName;

    if (!owner || !name) return;

    router.push({
      pathname: '/repository',
      query: { owner, name },
    });
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleSortChange = (column: SortBy) => {
    if (sortBy === column) {
      dispatch(setOrderBy(orderBy === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSortBy(column));
      dispatch(setOrderBy('asc'));
    }
  };

  // Icons or text to indicate current sort column and order
  const getSortIcon = (column: SortBy) => {
    if (sortBy !== column) return null;
    return orderBy === 'asc' ? <IconArrowNarrowUp /> : <IconArrowNarrowDown />;
  };

  const visibleItems = [...(items ?? [])]
    .filter((repo) => {
      if (signalFilters.includes('active')) {
        const days = Math.min(
          getDaysSince(repo.pushed_at),
          getDaysSince(repo.updated_at),
        );
        if (days > 90) return false;
      }

      if (signalFilters.includes('agentFit') && !hasAgentFit(repo)) {
        return false;
      }

      if (signalFilters.includes('lowIssues')) {
        const issueRatio =
          (repo.open_issues_count ?? 0) /
          Math.max(repo.stargazers_count ?? 0, 50);
        if (issueRatio > 0.04) return false;
      }

      if (
        signalFilters.includes('licensed') &&
        (!repo.license?.spdx_id || repo.license.spdx_id === 'NOASSERTION')
      ) {
        return false;
      }

      if (
        signalFilters.includes('docs') &&
        !repo.description &&
        !repo.homepage &&
        (repo.topics?.length ?? 0) === 0
      ) {
        return false;
      }

      return true;
    })
    .sort((first, second) => {
      if (sortBy !== 'signal') return 0;

      const firstSignal = getRepoSignalAssessment(first).score;
      const secondSignal = getRepoSignalAssessment(second).score;

      return orderBy === 'asc'
        ? firstSignal - secondSignal
        : secondSignal - firstSignal;
    });

  const rows = visibleItems.map((repo: GithubRepository, index) => {
    const signal = getRepoSignalAssessment(repo);
    const rowNumber = (currentPage - 1) * RESULTS_PER_PAGE + index + 1;
    const topics = repo.topics?.slice(0, 2) ?? [];
    const sparklinePoints = signal.dimensions
      .map((dimension, dimensionIndex) => {
        const x = dimensionIndex * 18;
        const y = 34 - Math.round((dimension.score / 100) * 30);

        return `${x},${y}`;
      })
      .join(' ');

    return (
      <Table.Tr
        key={repo.id}
        onClick={() => handleRepoClick(repo)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleRepoClick(repo);
          }
        }}
        role="button"
        tabIndex={0}
        className={classes.row}
      >
        <Table.Td className={`${classes.rank} ${classes.cell}`}>
          {rowNumber}
        </Table.Td>
        <Table.Td className={`${classes.action} ${classes.cell}`}>
          <SaveRepositoryButton repo={repo} />
        </Table.Td>
        <Table.Td className={`${classes.repository} ${classes.cell}`}>
          <div className={classes.repoIdentity}>
            <Avatar
              src={repo.owner?.avatar_url}
              alt={repo.owner?.login}
              radius="sm"
              size={24}
            />
            <div>
              <strong>{repo.full_name ?? repo.name}</strong>
              <span>
                {topics.length ? topics.join(' · ') : repo.owner?.login}
              </span>
            </div>
            {signal.score >= 66 && (
              <Badge className={classes.repoFlag} variant="outline">
                {signal.score >= 82 ? 'Prime' : 'Signal'}
              </Badge>
            )}
          </div>
        </Table.Td>
        <Table.Td className={`${classes.description} ${classes.cell}`}>
          {repo.description}
        </Table.Td>
        <Table.Td className={`${classes.signal} ${classes.cell}`}>
          <div className={classes.signalScore}>
            <strong>{signal.score}</strong>
            <svg aria-hidden="true" viewBox="0 0 90 36">
              <polyline points={sparklinePoints} />
            </svg>
          </div>
        </Table.Td>
        <Table.Td className={`${classes.stars} ${classes.cell}`}>
          {formatCompactNumber(repo.stargazers_count)}
        </Table.Td>
        <Table.Td className={`${classes.forks} ${classes.cell}`}>
          {formatCompactNumber(repo.forks)}
        </Table.Td>
        <Table.Td className={`${classes.language} ${classes.cell}`}>
          {repo.language && (
            <Badge className={classes.languageBadge} variant="outline">
              {repo.language}
            </Badge>
          )}
        </Table.Td>
        <Table.Td className={`${classes.lastUpdate} ${classes.cell}`}>
          {beautifyDate(repo.updated_at)}
        </Table.Td>
      </Table.Tr>
    );
  });

  const rowsSkeleton = Array.from({ length: 20 }).map((_, index) => (
    <Table.Tr key={index} style={{ width: '100%' }}>
      <Table.Td>
        <Skeleton height={30} width="40%" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={30} width="40%" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={30} width="90%" />
      </Table.Td>

      <Table.Td>
        <Flex justify="start">
          <Skeleton height={30} width="20%" />{' '}
          <Skeleton height={30} width="30%" ml="sm" />
        </Flex>
      </Table.Td>
      <Table.Td>
        <Skeleton height={30} width="35%" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={30} width="35%" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={30} width="35%" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={30} width="35%" />
      </Table.Td>
      <Table.Td>
        <Skeleton height={30} width="35%" />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <div className={classes.tableContainer}>
        <Table
          className={classes.table}
          striped
          highlightOnHover
          stickyHeader
          withColumnBorders
          captionSide="bottom"
        >
          <Table.Thead className={classes.tableHead}>
            <Table.Tr>
              <Table.Th className={`${classes.rank} ${classes.headerCell}`}>
                #
              </Table.Th>
              <Table.Th className={`${classes.action} ${classes.headerCell}`}>
                Save
              </Table.Th>
              <Table.Th
                className={`${classes.repository} ${classes.headerCell}`}
              >
                Repository
              </Table.Th>
              <Table.Th
                className={`${classes.description} ${classes.headerCell}`}
              >
                Description
              </Table.Th>
              <Table.Th
                className={`${classes.signal} ${classes.headerCell}`}
                onClick={() => handleSortChange('signal')}
              >
                <Flex justify="space-between" align="center">
                  Signal score {getSortIcon('signal')}
                </Flex>
              </Table.Th>
              <Table.Th
                className={`${classes.stars} ${classes.headerCell}`}
                onClick={() => handleSortChange('stars')}
              >
                <Flex justify="space-between" align="center">
                  Stars {getSortIcon('stars')}
                </Flex>
              </Table.Th>
              <Table.Th
                className={`${classes.forks} ${classes.headerCell}`}
                onClick={() => handleSortChange('forks')}
              >
                <Flex justify="space-between" align="center">
                  Forks {getSortIcon('forks')}
                </Flex>
              </Table.Th>
              <Table.Th className={`${classes.language} ${classes.headerCell}`}>
                Language
              </Table.Th>
              <Table.Th
                className={`${classes.lastUpdate} ${classes.headerCell}`}
                onClick={() => handleSortChange('lastUpdate')}
              >
                <Flex justify="space-between" align="center">
                  Updated {getSortIcon('lastUpdate')}
                </Flex>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          {isLoading && <Table.Tbody>{rowsSkeleton}</Table.Tbody>}
          {!isLoading && visibleItems.length > 0 && (
            <Table.Tbody>{rows}</Table.Tbody>
          )}
          <Table.Caption>
            <Flex align="center" className={classes.caption}>
              <IconAlertCircle size={20} style={{ marginRight: 10 }} />{' '}
              {visibleItems.length === 0 && !isLoading
                ? 'No repositories match the current filters'
                : 'Click on a row to inspect repository details'}
            </Flex>
          </Table.Caption>
        </Table>
      </div>
      <CustomCard>
        <Center mt="sm">
          <Pagination
            className={classes.pagination}
            classNames={{ control: classes.paginationControl }}
            total={totalPages}
            value={currentPage}
            onChange={handlePageChange}
          />
        </Center>
      </CustomCard>
    </>
  );
};

export default RepoTable;
