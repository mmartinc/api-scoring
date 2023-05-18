import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';
import { Button } from '../button';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.container}>
      <div className={styles.leftSide}>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='Logo'
            width={400}
            height={50}
            className={styles.companyLogo}
          />
        </Link>
        <Link href='/modules/design/reports'>
          <Button active={router.asPath === '/modules/design/reports'}>
            Diseño
          </Button>
        </Link>
        <Link href='/modules/implementation/reports'>
          <Button active={router.asPath === '/modules/implementation/reports'}>
            Implementación
          </Button>
        </Link>
      </div>
      <h1 className={styles.title}>AxPI Scoring</h1>
    </header>
  );
};
