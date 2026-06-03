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
import classes from './Hero.module.css';

const signalRows = [
  { metric: '01', label: 'Scout', value: 'AI infra, agents, OSS signals' },
  { metric: '02', label: 'Save', value: 'Clerk workspace + D1 index' },
  { metric: '03', label: 'Snapshot', value: 'R2 repository context' },
  { metric: '04', label: 'Prepare', value: 'Triage-ready maintainer memory' },
];

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
              <span>repo signal console</span>
              <span>live workspace</span>
            </div>

            <div className={classes.consoleFrame}>
              <div className={classes.consoleTopline}>
                <span>source/github.search</span>
                <span>ready</span>
              </div>

              <div className={classes.radar}>
                <span className={classes.radarCore}>Muum</span>
                <span className={classes.radarRing} />
                <span className={classes.radarRingWide} />
              </div>

              <div className={classes.signalRows}>
                {signalRows.map((row) => (
                  <div className={classes.signalRow} key={row.metric}>
                    <span>{row.metric}</span>
                    <strong>{row.label}</strong>
                    <em>{row.value}</em>
                  </div>
                ))}
              </div>

              <div className={classes.pipeline}>
                <span className={classes.pipelineItem}>GitHub</span>
                <span className={classes.pipelineItem}>D1</span>
                <span className={classes.pipelineItem}>R2</span>
                <span className={classes.pipelineItem}>Clerk</span>
              </div>
            </div>

            <div className={classes.signalGrid}>
              <span className={classes.signalGridItem}>GitHub signal</span>
              <span className={classes.signalGridItem}>D1 saved list</span>
              <span className={classes.signalGridItem}>R2 snapshot</span>
              <span className={classes.signalGridItem}>Clerk workspace</span>
            </div>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
}

export default Hero;
