/* eslint-disable import/order */
import { fetchPlatformStatus } from '@/helpers/cloudflare';
import { Badge, Group, Paper, Skeleton, Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './CloudflareReadiness.module.css';

function StatusBadge({ active, label }: { active: boolean; label: string }) {
  return (
    <Badge
      className={active ? classes.statusActive : classes.statusMuted}
      variant="outline"
    >
      {label}
    </Badge>
  );
}

export default function CloudflareReadiness() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['cloudflarePlatformStatus'],
    queryFn: fetchPlatformStatus,
    staleTime: 60000,
  });

  if (isLoading) {
    return <Skeleton className={classes.skeleton} height={78} radius="sm" />;
  }

  if (isError || !data) {
    return (
      <Paper component="section" className={classes.panel}>
        <Group justify="space-between" gap="md" className={classes.content}>
          <Stack gap={2}>
            <Text className={classes.title}>Workspace backend</Text>
            <Text className={classes.description}>
              Cloudflare Functions inactive
            </Text>
          </Stack>
          <StatusBadge active={false} label="Pages Functions" />
        </Group>
      </Paper>
    );
  }

  return (
    <Paper component="section" className={classes.panel}>
      <Group
        justify="space-between"
        align="center"
        gap="md"
        className={classes.content}
      >
        <Stack gap={2}>
          <Text className={classes.title}>Workspace backend</Text>
          <Text className={classes.description}>
            Authenticated saves, repository snapshots, and workspace storage
          </Text>
        </Stack>
        <Group gap="xs">
          <StatusBadge active={data.clerk} label="Clerk" />
          <StatusBadge active={data.d1} label="D1" />
          <StatusBadge active={data.r2} label="R2" />
        </Group>
      </Group>
    </Paper>
  );
}
