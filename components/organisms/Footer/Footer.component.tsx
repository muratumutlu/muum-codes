import { ActionIcon, Container, Divider, Grid, Group, Text, Title, rem } from '@mantine/core';

import { IconBrandInstagram, IconBrandLinkedin, IconBrandX } from '@tabler/icons-react';

import classes from './Footer.module.css';

export default function Footer() {
  const handleTwitterClick = () => {
    window.open('https://twitter.com/alimuratumutlu', '_blank');
  };
  const handleLinkedinClick = () => {
    window.open('https://linkedin.com/in/muratumutlu', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/alimuratumutlu', '_blank');
  };

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner} size="xl" px="md">
        <Grid className={classes.groups}>
          <Grid.Col span={{ base: 12, md: 12, lg: 12 }}>
            <Title variant="gradient" fw={900}>
              Muum Codes
            </Title>
            <Text c="dimmed" size="md" className={classes.description}>
              Muum Codes is built for the community by Muum Dev (Murat Umutlu). It is a platform to
              share and learn about web development, programming, and software engineering. You can
              also filter and search for repositories on GitHub.
            </Text>
          </Grid.Col>
        </Grid>
      </Container>
      <Container className={classes.inner} size="xl" px="md">
        <Divider mb="xl" />
      </Container>
      <Container className={classes.inner} size="xl" px="md">
        <Text c="dimmed" size="sm">
          © 2024{' '}
          <a href="https://linkedin.com/in/muratumutlu" className={classes.link}>
            Muum Development
          </a>
        </Text>
        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle" onClick={handleTwitterClick}>
            <IconBrandX style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle" onClick={handleLinkedinClick}>
            <IconBrandLinkedin style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" color="gray" variant="subtle" onClick={handleInstagramClick}>
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}
