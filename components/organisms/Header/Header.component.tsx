/* eslint-disable import/order */
import { Logo, ThemeSwitcher } from '@/components';
import { ActionIcon, Container, Group } from '@mantine/core';

import { IconQuestionMark } from '@tabler/icons-react';
import classes from './Header.module.css';

import router from 'next/router';

export default function Header() {
  const handleQuestionMarkClick = () => {
    router.push('/about');
  };

  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Logo brand="🔍 Muum Codes" />
        <Group>
          <ThemeSwitcher />
          <ActionIcon
            aria-label="Search"
            radius="xl"
            size="lg"
            variant="outline"
            color="gray"
            onClick={handleQuestionMarkClick}
          >
            <IconQuestionMark />
          </ActionIcon>
        </Group>
      </Container>
    </header>
  );
}
