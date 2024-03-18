import { useCallback, useEffect, useState } from 'react';

import { Skeleton, Switch, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

import classes from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(true); // Adding a loading state

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      const isDarkMode = storedTheme ? storedTheme === 'dark' : colorScheme === 'dark';
      setChecked(isDarkMode);
      setLoading(false); // Setting loading to false after determining the theme

      if (!storedTheme) {
        localStorage.setItem('theme', colorScheme);
      }
    }
  }, [colorScheme]);

  const toggleScheme = useCallback(
    (checkStatus: boolean) => {
      setChecked(checkStatus);

      setTimeout(() => {
        const newScheme = checkStatus ? 'dark' : 'light';
        if (typeof window !== 'undefined') {
          setColorScheme(newScheme);
          localStorage.setItem('theme', newScheme);
        }
      }, 150);
    },
    [setColorScheme]
  );

  const sunIcon = <IconSun className={classes.icon} stroke={2.5} color={theme.colors.yellow[8]} />;
  const moonIcon = (
    <IconMoonStars className={classes.icon} stroke={1.5} color={theme.colors.gray[0]} />
  );

  // Rendering a placeholder until loading is complete
  if (loading) {
    return <Skeleton height={36} width={76} radius="xl" />;
  }

  return (
    <Switch
      size="xl"
      checked={checked}
      onLabel={moonIcon}
      offLabel={sunIcon}
      onChange={(event) => toggleScheme(event.currentTarget.checked)}
    />
  );
}
