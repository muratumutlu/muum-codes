/* eslint-disable import/order */
import { fetchPlatformStatus } from '@/helpers/cloudflare';
import { Badge, Group, Paper, Skeleton, Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

function StatusBadge({ active, label }: { active: boolean; label: string }) {
  return (
    <Badge
      color={active ? 'teal' : 'gray'}
      variant={active ? 'filled' : 'light'}
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
    return <Skeleton height={74} radius="md" />;
  }

  if (isError || !data) {
    return (
      <Paper p="md" radius="md" withBorder mb="md">
        <Group justify="space-between">
          <Stack gap={2}>
            <Text fw={700}>Workspace backend</Text>
            <Text c="dimmed" size="sm">
              Cloudflare Functions inactive
            </Text>
          </Stack>
          <StatusBadge active={false} label="Pages Functions" />
        </Group>
      </Paper>
    );
  }

  return (
    <Paper p="md" radius="md" withBorder mb="md">
      <Group justify="space-between" align="center">
        <Stack gap={2}>
          <Text fw={700}>Workspace backend</Text>
          <Text c="dimmed" size="sm">
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
