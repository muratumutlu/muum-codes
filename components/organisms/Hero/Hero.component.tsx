import { Badge, Box, Group, Stack, Text, Title } from '@mantine/core';
import classes from './Hero.module.css';

function Hero() {
  return (
    <Box component="section" className={classes.hero}>
      <div className={classes.sun} />
      <div className={classes.horizon} />
      <div className={classes.heroGrid}>
        <Stack gap="lg" className={classes.content}>
          <Group gap="xs">
            <Badge className={classes.badge} variant="outline">
              Open source intelligence for AI agents_
            </Badge>
          </Group>

          <Title className={classes.title}>
            <span className={classes.titleLine}>
              Find the repositories that{' '}
            </span>
            <span className={classes.titleLine}>
              power tomorrow&apos;s{' '}
              <span className={classes.accent}>agents</span>
            </span>
          </Title>

          <Text className={classes.description}>
            Real-time signals from the open-source frontier. Search, filter, and
            lock in the strongest repositories.
          </Text>
        </Stack>
      </div>
    </Box>
  );
}

export default Hero;
