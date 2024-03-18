/* eslint-disable import/order */
import React from 'react';

import { useGithubData } from '@/hooks';
import {
  Avatar,
  Badge,
  Card,
  Center,
  Flex,
  Grid,
  Pagination,
  Skeleton,
  Table,
  Text,
} from '@mantine/core';
import { IconArrowNarrowDown, IconArrowNarrowUp } from '@tabler/icons-react';

import { beautifyDate } from '@/utils/date';

import { selectFilter, setCurrentPage, setOrderBy, setSortBy } from '@/store/filter/filterSlice';
import { useDispatch, useSelector } from 'react-redux';
import classes from './RepoTable.module.css';

import type { SortBy } from '@/types/Filter.types';
import CustomCard from '../CustomCard/CustomCard.component';

const RepoTable: React.FC = () => {
  const { filter, searchTerm, sortBy, orderBy, currentPage, totalPages } =
    useSelector(selectFilter);

  const { isLoading, items } = useGithubData(
    searchTerm,
    filter,
    sortBy as SortBy,
    orderBy,
    currentPage
  );

  const dispatch = useDispatch();

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

  const rows = items?.map((repo: any) => (
    <Table.Tr key={repo.id}>
      <Table.Td className={classes.id}>
        <Text>{repo.id}</Text>
      </Table.Td>
      <Table.Td className={classes.username}>
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

      <Table.Td className={classes.description}>{repo.description}</Table.Td>
      <Table.Td className={classes.stars}>{repo.stargazers_count}</Table.Td>
      <Table.Td className={classes.forks}>{repo.forks}</Table.Td>
      <Table.Td className={classes.lastUpdate}>{beautifyDate(repo.updated_at)}</Table.Td>
    </Table.Tr>
  ));

  const rowsSkeleton = Array.from({ length: 20 }).map((_, index) => (
    <Table.Tr key={index} style={{ width: '100%' }}>
      <Table.Td>
        <Skeleton height={30} width="90%" />
      </Table.Td>

      <Table.Td>
        <Flex justify="start">
          <Skeleton height={30} width="20%" /> <Skeleton height={30} width="30%" ml="sm" />
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
        <Card className={classes.tableContainer} p="xs">
          <Table
            striped
            highlightOnHover
            stickyHeader
            stickyHeaderOffset={60}
            verticalSpacing="sm"
            withColumnBorders
            captionSide="bottom"
            style={{
              minWidth: '600px', // Ensuring a minimum width for the table to enforce scrolling
              width: '100%',
              boxShadow: '0px 0px 33px 9px rgba(0, 0, 0, 0.1)',
              borderRadius: 8,
              tableLayout: 'fixed', // Ensure table layout is fixed
            }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th className={classes.id}>
                  <Flex justify="space-between">ID</Flex>
                </Table.Th>
                <Table.Th className={classes.username}>Username</Table.Th>
                <Table.Th className={classes.description}>
                  <Flex justify="space-between">Repo Description</Flex>
                </Table.Th>
                <Table.Th className={classes.stars} onClick={() => handleSortChange('stars')}>
                  <Flex justify="space-between">Stars {getSortIcon('stars')}</Flex>
                </Table.Th>
                <Table.Th className={classes.forks} onClick={() => handleSortChange('forks')}>
                  <Flex justify="space-between">Forks {getSortIcon('forks')}</Flex>
                </Table.Th>
                <Table.Th
                  className={classes.lastUpdate}
                  onClick={() => handleSortChange('lastUpdate')}
                >
                  <Flex justify="space-between">Last Update {getSortIcon('lastUpdate')}</Flex>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            {isLoading && <Table.Tbody>{rowsSkeleton}</Table.Tbody>}
            {!isLoading && items?.length > 0 && <Table.Tbody>{rows}</Table.Tbody>}
            <Table.Caption>
              <CustomCard>
                <Center mt="sm">
                  <Pagination total={totalPages} value={currentPage} onChange={handlePageChange} />
                </Center>
              </CustomCard>
            </Table.Caption>
          </Table>
        </Card>
      </Grid.Col>
    </Grid>
  );
};

export default RepoTable;
