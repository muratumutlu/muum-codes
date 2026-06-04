import Link from 'next/link';
import {
  Anchor,
  Badge,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { featuredStackItems } from '@/data/featuredStack';
import classes from './FeaturedStack.module.css';

interface FeaturedStackProps {
  compact?: boolean;
}

const getMissionHref = (scanQuery: string) => ({
  pathname: '/',
  query: { q: scanQuery },
  hash: 'workspace',
});

export default function FeaturedStack({ compact = false }: FeaturedStackProps) {
  const items = compact ? featuredStackItems.slice(0, 6) : featuredStackItems;

  return (
    <Paper
      id="stack"
      component="section"
      className={`${classes.section} ${compact ? classes.compact : ''}`}
    >
      <Stack gap="lg">
        <Group justify="space-between" align="flex-start" gap="lg">
          <div>
            <Text className={classes.eyebrow}>Agent Stack Atlas</Text>
            <Title className={classes.title}>
              Featured skills and plugin territories worth scanning.
            </Title>
          </div>
          <Stack gap="sm" className={classes.aside}>
            <Text className={classes.copy}>
              Curated surfaces for repos that help agents build, connect,
              evaluate, observe, and ship with stronger context.
            </Text>
            {compact && (
              <Button
                component={Link}
                href="/stack"
                className={classes.stackLink}
                rightSection={<IconArrowRight size={15} />}
              >
                Open atlas
              </Button>
            )}
          </Stack>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2, lg: compact ? 3 : 2 }} spacing="md">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <article className={classes.card} key={item.id}>
                <Group justify="space-between" align="flex-start" gap="sm">
                  <span className={classes.icon}>
                    <Icon size={19} />
                  </span>
                  <Badge className={classes.category} variant="outline">
                    {item.category}
                  </Badge>
                </Group>

                <div>
                  <Title order={3} className={classes.cardTitle}>
                    {item.title}
                  </Title>
                  <Text className={classes.description}>
                    {item.description}
                  </Text>
                </div>

                <Group gap={8}>
                  {item.tags.slice(0, compact ? 2 : 3).map((tag) => (
                    <span className={classes.tag} key={tag}>
                      {tag}
                    </span>
                  ))}
                </Group>

                {!compact && (
                  <div className={classes.metaGrid}>
                    <div>
                      <Text className={classes.metaLabel}>Maturity</Text>
                      <Text className={classes.metaValue}>{item.maturity}</Text>
                    </div>
                    <div>
                      <Text className={classes.metaLabel}>Best fit</Text>
                      <Text className={classes.metaValue}>{item.fit}</Text>
                    </div>
                  </div>
                )}

                <Group justify="space-between" align="center" gap="sm">
                  <Anchor
                    component={Link}
                    href={getMissionHref(item.scanQuery)}
                    className={classes.scanLink}
                  >
                    Scan territory
                  </Anchor>
                  <Text className={classes.query}>{item.scanQuery}</Text>
                </Group>
              </article>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Paper>
  );
}
