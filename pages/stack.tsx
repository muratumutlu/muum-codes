import Link from 'next/link';
import {
  Anchor,
  Button,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconArrowLeft, IconSearch } from '@tabler/icons-react';
import { FeaturedStack, SinglePageTemplate } from '@/components';
import classes from './stack.module.css';

export default function StackPage() {
  return (
    <SinglePageTemplate title="Agent Stack Atlas | Muum Repo Explorer">
      <Stack gap="lg" className={classes.shell}>
        <Group justify="space-between" gap="md">
          <Button
            component={Link}
            href="/"
            className={classes.backButton}
            leftSection={<IconArrowLeft size={16} />}
            variant="subtle"
          >
            Back to explorer
          </Button>
          <Anchor
            component={Link}
            href="/#workspace"
            className={classes.scanLink}
          >
            Repository search
          </Anchor>
        </Group>

        <Paper component="section" className={classes.hero}>
          <Stack gap="md">
            <Text className={classes.eyebrow}>Featured skills and plugins</Text>
            <Title className={classes.title}>
              A curated atlas for agent-native repository discovery.
            </Title>
            <Text className={classes.copy}>
              Start from the stack territory first, then let Muum scan GitHub
              for the repos with stronger readiness, docs, maintenance, and
              workflow signals.
            </Text>
            <Button
              component={Link}
              href="/#workspace"
              className={classes.primaryAction}
              leftSection={<IconSearch size={16} />}
            >
              Open repository search
            </Button>
          </Stack>
        </Paper>

        <FeaturedStack />
      </Stack>
    </SinglePageTemplate>
  );
}
