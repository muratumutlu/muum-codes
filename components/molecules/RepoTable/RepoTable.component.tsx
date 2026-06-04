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
  Grid,
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

const RepoTable: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter) as ReturnType<
    typeof selectFilter
  > & {
    language?: string;
  };
  const { searchTerm, sortBy, orderBy, currentPage, totalPages } = filter;
  const activeLanguages = Array.isArray(filter.languages)
    ? filter.languages
    : [filter.language ?? 'javascript'];

  const { isLoading, items } = useGithubData(
    searchTerm,
    activeLanguages,
    sortBy as SortBy,
    orderBy,
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

  const rows = items?.map((repo: GithubRepository) => {
    const signal = getRepoSignalAssessment(repo);

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
        <Table.Td className={`${classes.action} ${classes.cell}`}>
          <SaveRepositoryButton repo={repo} />
        </Table.Td>
        <Table.Td className={`${classes.signal} ${classes.cell}`}>
          <div className={classes.signalBadge}>
            <span>{signal.score}</span>
            <em>{signal.grade}</em>
          </div>
        </Table.Td>
        <Table.Td className={`${classes.username} ${classes.cell}`}>
          <Flex justify="start" align="center">
            <Avatar
              src={repo.owner?.avatar_url}
              alt={repo.owner?.login}
              radius="md"
              size="sm"
              mr="xs"
            />
            <Badge color="blue" variant="filled" radius="sm">
              {repo.owner?.login}
            </Badge>
          </Flex>
        </Table.Td>

        <Table.Td className={`${classes.description} ${classes.cell}`}>
          {repo.description}
        </Table.Td>
        <Table.Td className={`${classes.stars} ${classes.cell}`}>
          {repo.stargazers_count}
        </Table.Td>
        <Table.Td className={`${classes.forks} ${classes.cell}`}>
          {repo.forks}
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
    </Table.Tr>
  ));

  return (
    <Grid mt="md">
      <Grid.Col span={12}>
        <CustomCard>
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
                  <Table.Th
                    className={`${classes.action} ${classes.headerCell}`}
                  >
                    Save
                  </Table.Th>
                  <Table.Th
                    className={`${classes.signal} ${classes.headerCell}`}
                  >
                    Signal
                  </Table.Th>
                  <Table.Th
                    className={`${classes.username} ${classes.headerCell}`}
                  >
                    Username
                  </Table.Th>
                  <Table.Th
                    className={`${classes.description} ${classes.headerCell}`}
                  >
                    Repo Description
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
                  <Table.Th
                    className={`${classes.lastUpdate} ${classes.headerCell}`}
                    onClick={() => handleSortChange('lastUpdate')}
                  >
                    <Flex justify="space-between" align="center">
                      Last Update {getSortIcon('lastUpdate')}
                    </Flex>
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              {isLoading && <Table.Tbody>{rowsSkeleton}</Table.Tbody>}
              {!isLoading && (items?.length ?? 0) > 0 && (
                <Table.Tbody>{rows}</Table.Tbody>
              )}
              <Table.Caption>
                <Flex align="center" className={classes.caption}>
                  <IconAlertCircle size={20} style={{ marginRight: 10 }} />{' '}
                  Click on a row to inspect repository details
                </Flex>
              </Table.Caption>
            </Table>
          </div>
        </CustomCard>
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
      </Grid.Col>
    </Grid>
  );
};

export default RepoTable;
