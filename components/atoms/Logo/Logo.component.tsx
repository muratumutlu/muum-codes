import { useEffect, useState } from 'react';

import { Skeleton, useMantineColorScheme } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import classes from './Logo.module.css';

interface LogoProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export default function Logo({ onClick }: LogoProps) {
  const [logoSrc, setLogoSrc] = useState('');

  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    const newLogoSrc =
      colorScheme === 'dark' ? '/muum-dark-mode.png' : '/muum-light-mode.png';
    setLogoSrc(newLogoSrc);
  }, [colorScheme]);

  if (!logoSrc) return <Skeleton height={44} width={188} />;

  return (
    <Link href="/" onClick={onClick} className={classes.link} passHref>
      <span className={classes.mark}>
        <Image
          className={classes.image}
          src={logoSrc}
          alt="Muum Repo Explorer"
          width={54}
          height={22}
          title="Muum Repo Explorer"
          priority
        />
      </span>
      <span className={classes.wordmark}>
        <span className={classes.name}>Muum</span>
        <span className={classes.product}>Repo Explorer</span>
      </span>
    </Link>
  );
}
