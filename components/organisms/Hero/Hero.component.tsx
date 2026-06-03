import { Box, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './Hero.module.css';

function Hero() {
  const isMobile = useMediaQuery('(max-width: 755px)');

  return (
    <Box mb="xl">
      <Title className={classes.title} ta="center" mt={100} fw={900} size={80}>
        Muum{' '}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'pink', to: 'blue' }}
        >
          Repo Explorer
        </Text>
      </Title>
      <Text
        c="dimmed"
        ta="center"
        size="lg"
        maw={isMobile ? 300 : 800}
        mx="auto"
        mt="md"
      >
        Discover, compare, and triage open-source repositories from one focused
        workspace. Built for developers who maintain projects across web and
        macOS.
      </Text>
    </Box>
  );
}

export default Hero;
