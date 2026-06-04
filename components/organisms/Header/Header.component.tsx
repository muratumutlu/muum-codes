/* eslint-disable import/order */
import { AuthControls, Logo } from '@/components';
import { Container, Group } from '@mantine/core';
import Link from 'next/link';

import classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Group gap="md" wrap="nowrap">
          <Logo />
        </Group>

        <Group className={classes.tools} visibleFrom="md">
          <Link href="/stack" className={classes.navLink}>
            Agent Stacks
          </Link>
          <AuthControls />
        </Group>
        <Group align="center" hiddenFrom="md">
          <Link href="/stack" className={classes.navLink}>
            Agent Stacks
          </Link>
          <AuthControls compact />
        </Group>
      </Container>
    </header>
  );
}
