import Link from 'next/link';
import classes from './Logo.module.css';

interface LogoProps {
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <Link href="/" onClick={onClick} className={classes.link} passHref>
      <span className={classes.mark}>
        <span className={classes.pixelMark}>muum</span>
      </span>
    </Link>
  );
}
