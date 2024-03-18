import React from 'react';

import { Divider, Title } from '@mantine/core';

import classes from './PageTitle.module.css';

interface pageTitleProps {
  children: React.ReactNode;
}

export default function PageTitle({ children }: pageTitleProps) {
  return (
    <>
      <Title order={2} size={60} fw={900} className={classes.title} mt={0}>
        {children}
      </Title>
      <Divider mb="xl" mt="xs" variant="dashed" />
    </>
  );
}
