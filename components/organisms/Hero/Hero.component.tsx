import { Badge, Box, Button, Group, Stack, Text, Title } from '@mantine/core';
import {
  IconArrowRight,
  IconChartBar,
  IconFileText,
  IconSearch,
} from '@tabler/icons-react';
import classes from './Hero.module.css';

const proofPoints = [
  { icon: IconSearch, label: 'Agent territories' },
  { icon: IconChartBar, label: 'Readiness signals' },
  { icon: IconFileText, label: 'README context' },
];

function Hero() {
  return (
    <Box component="section" className={classes.hero}>
      <Stack gap="lg" className={classes.content}>
        <Group gap="xs">
          <Badge className={classes.badge} variant="outline">
            Agent-ready open source intelligence
          </Badge>
        </Group>

        <Title className={classes.title}>
          Find repos your agents can trust.
        </Title>

        <Text className={classes.description}>
          Muum turns GitHub search into an agent-readiness console: territory
          scouting, repository signal scores, README context, and the evidence
          needed before your next build pass.
        </Text>

        <Group gap="sm" className={classes.heroActions}>
          <Button
            component="a"
            href="#workspace"
            className={classes.primaryAction}
            rightSection={<IconArrowRight size={16} />}
          >
            Start scanning
          </Button>
          <Button
            component="a"
            href="#signals"
            className={classes.secondaryAction}
            variant="outline"
          >
            View signals
          </Button>
        </Group>

        <Group gap="sm" className={classes.signalStrip}>
          {proofPoints.map(({ icon: Icon, label }) => (
            <span key={label}>
              <Icon size={15} />
              {label}
            </span>
          ))}
        </Group>
      </Stack>
    </Box>
  );
}

export default Hero;
