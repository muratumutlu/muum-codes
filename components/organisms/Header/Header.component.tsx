/* eslint-disable import/order */
import { Logo, ThemeSwitcher } from '@/components';
import { Container } from '@mantine/core';

import classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Logo brand="Muum Codes" />
        <ThemeSwitcher />
      </Container>
    </header>
  );
}
