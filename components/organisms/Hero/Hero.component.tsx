import { Box, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import classes from './Hero.module.css';

function Hero() {
  const isMobile = useMediaQuery('(max-width: 755px)');

  return (
    <Box mb="xl">
      <Title className={classes.title} ta="center" mt={100} fw={900} size={80}>
        Hi{' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Coder!
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={isMobile ? 300 : 800} mx="auto" mt="md">
        Welcome to the Muum Codes&apos; Github Explorer. You can search for any repository on Github
        and see its details in a beautiful table. That will help you to find the most starred
        repositories on Github. Enjoy it!
      </Text>
    </Box>
  );
}

export default Hero;
