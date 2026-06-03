import {
  ActionIcon,
  Anchor,
  Badge,
  Box,
  Container,
  Divider,
  Grid,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
  rem,
} from '@mantine/core';

import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconDatabase,
  IconGitPullRequest,
  IconRadar2,
} from '@tabler/icons-react';

import ThemeSwitcher from '../../atoms/ThemeSwitcher/ThemeSwitcher.component';
import classes from './Footer.module.css';

export default function Footer() {
  const footerSignals = [
    {
      icon: IconRadar2,
      label: 'Scout',
      description: 'Search AI, infra, and maintainer ecosystems fast.',
    },
    {
      icon: IconDatabase,
      label: 'Remember',
      description: 'Persist saved repositories with Clerk, D1, and R2.',
    },
    {
      icon: IconGitPullRequest,
      label: 'Triage',
      description: 'Prepare the context future agents need to act.',
    },
  ];

  const handleTwitterClick = () => {
    window.open('https://twitter.com/alimuratumutlu', '_blank');
  };
  const handleLinkedinClick = () => {
    window.open('https://linkedin.com/in/muratumutlu', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/alimuratumutlu', '_blank');
  };

  const handleGithubClick = () => {
    window.open('https://github.com/muratumutlu/muum-repo-explorer', '_blank');
  };

  return (
    <footer className={classes.footer}>
      <Container size="xl" px="md">
        <Grid className={classes.groups}>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Badge className={classes.badge}>For AI-native maintainers</Badge>
            <Title className={classes.title}>
              Open-source memory for builders who move with agents.
            </Title>
            <Text className={classes.description}>
              Muum Repo Explorer is a focused workspace for discovering, saving,
              and preparing repository context before the next AI development
              pass.
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              {footerSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <Box className={classes.signal} key={signal.label}>
                    <Icon size={22} />
                    <Text fw={800}>{signal.label}</Text>
                    <Text size="sm">{signal.description}</Text>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Grid.Col>
        </Grid>
      </Container>

      <Container size="xl" px="md">
        <Divider className={classes.divider} />
      </Container>

      <Container className={classes.inner} size="xl" px="md">
        <Stack gap={2}>
          <Text className={classes.kicker}>Muum Repo Explorer</Text>
          <Text c="dimmed" size="sm">
            © 2026{' '}
            <Anchor href="https://muum.dev" className={classes.link}>
              Muum Dev
            </Anchor>
          </Text>
        </Stack>
        <Group
          gap="xs"
          className={classes.social}
          justify="flex-end"
          wrap="wrap"
        >
          <Box className={classes.themeControl}>
            <Text className={classes.themeLabel}>Theme</Text>
            <ThemeSwitcher />
          </Box>
          <ActionIcon
            size="lg"
            variant="outline"
            aria-label="GitHub repository"
            onClick={handleGithubClick}
            className={classes.socialButton}
          >
            <IconBrandGithub
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="outline"
            aria-label="X profile"
            onClick={handleTwitterClick}
            className={classes.socialButton}
          >
            <IconBrandX
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="outline"
            aria-label="LinkedIn profile"
            onClick={handleLinkedinClick}
            className={classes.socialButton}
          >
            <IconBrandLinkedin
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
          <ActionIcon
            size="lg"
            variant="outline"
            aria-label="Instagram profile"
            onClick={handleInstagramClick}
            className={classes.socialButton}
          >
            <IconBrandInstagram
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
