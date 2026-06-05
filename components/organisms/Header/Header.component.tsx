/* eslint-disable import/order */
import { AuthControls, Logo } from '@/components';
import { Container, Group } from '@mantine/core';
import Link from 'next/link';

import classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <Container size={1536} className={classes.inner}>
        <Group gap="md" wrap="nowrap">
          <Logo />
          <nav className={classes.primaryNav} aria-label="Primary">
            <Link href="/#workspace" className={classes.navTab} data-active>
              Scout
            </Link>
            <Link href="/#signals" className={classes.navTab}>
              Signals
            </Link>
            <Link href="/stack" className={classes.navTab}>
              Build log
            </Link>
          </nav>
        </Group>

        <Group className={classes.tools} visibleFrom="md">
          <Link href="/stack" className={classes.navLink}>
            Agent Stacks
          </Link>
          <Link href="/stack" className={classes.navLink}>
            Skills
          </Link>
          <Link href="/stack" className={classes.navLink}>
            Plugins
          </Link>
          <span className={classes.savedSignal}>Saved</span>
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
