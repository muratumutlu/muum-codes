import { Stack, Text } from '@mantine/core';
import Link from 'next/link';

import classes from './Logo.module.css';

interface logoProps {
  brand: string;
}

export default function Logo({ brand }: logoProps) {
  return (
    <Link href="/" passHref className={classes.link}>
      <Stack>
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: 'pink', to: 'blue' }}
          fw={900}
        >
          {brand}
        </Text>
      </Stack>
    </Link>
  );
}
