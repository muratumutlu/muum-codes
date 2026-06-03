import {
  Badge,
  Box,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import Image from 'next/image';
import classes from './Hero.module.css';

function Hero() {
  return (
    <Box component="section" className={classes.hero}>
      <Grid align="center" gutter={{ base: 28, md: 48 }}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack gap="lg">
            <Group gap="xs">
              <Badge className={classes.badge} variant="outline">
                AI-native open source intelligence
              </Badge>
              <Badge className={classes.badgeMuted} variant="light">
                D1 + R2 memory ready
              </Badge>
            </Group>

            <Title className={classes.title}>
              Repo intelligence for new-age developers
            </Title>

            <Text className={classes.description}>
              Find the repositories worth studying, saving, and acting on before
              your next agent run. Muum turns open-source discovery into a
              private workspace for AI-assisted maintainers.
            </Text>

            <Group gap="sm" className={classes.signalStrip}>
              <span>Scout ecosystems</span>
              <span>Save context</span>
              <span>Prepare triage</span>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper className={classes.visualPanel}>
            <div className={classes.visualHeader}>
              <span>maintainer map</span>
              <span>live workspace</span>
            </div>
            <div className={classes.imageFrame}>
              <Image
                src="/images/architecture.png"
                alt="Muum repository intelligence architecture"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 520px"
                className={classes.architectureImage}
              />
            </div>
            <div className={classes.signalGrid}>
              <span>GitHub signal</span>
              <span>D1 saved list</span>
              <span>R2 snapshot</span>
              <span>Clerk workspace</span>
            </div>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default Hero;
