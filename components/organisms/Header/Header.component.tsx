/* eslint-disable import/order */
import { AuthControls, Logo } from '@/components';
import { Badge, Button, Container, Group, Menu, rem } from '@mantine/core';

import {
  IconMenu2,
  IconRocket,
  IconScan,
  IconServerBolt,
} from '@tabler/icons-react';
import classes from './Header.module.css';

export default function Header() {
  return (
    <header className={classes.header}>
      <Container size="xl" className={classes.inner}>
        <Group gap="md" wrap="nowrap">
          <Logo />
          <Badge className={classes.statusBadge} visibleFrom="sm">
            AI-native
          </Badge>
        </Group>

        <Group className={classes.nav} visibleFrom="md">
          <Button
            component="a"
            href="#workspace"
            variant="subtle"
            leftSection={<IconScan size={16} />}
            className={classes.navButton}
          >
            Scout
          </Button>
          <Button
            component="a"
            href="#signals"
            variant="subtle"
            leftSection={<IconServerBolt size={16} />}
            className={classes.navButton}
          >
            Signals
          </Button>
          <Button
            component="a"
            href="https://github.com/muratumutlu/muum-repo-explorer"
            target="_blank"
            variant="subtle"
            leftSection={<IconRocket size={16} />}
            className={classes.navButton}
          >
            Build log
          </Button>
        </Group>

        <Group className={classes.tools} visibleFrom="md">
          <AuthControls />
        </Group>
        <Group align="center" hiddenFrom="md">
          <AuthControls compact />
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button radius="sm" className={classes.menuButton}>
                <IconMenu2 size={18} />
              </Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                component="a"
                href="#workspace"
                leftSection={
                  <IconScan style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Scout
              </Menu.Item>
              <Menu.Item
                component="a"
                href="#signals"
                leftSection={
                  <IconServerBolt style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Signals
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
    </header>
  );
}
