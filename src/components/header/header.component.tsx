import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.css';
import { useRouter } from 'next/router';
import classNames from 'classnames';

export const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.container}>
      <div className={styles.leftSide}>
        <Link href='/' className={styles.home}>
          <Image
            src='/logo.png'
            alt='Logo'
            width={400}
            height={50}
            className={styles.companyLogo}
          />
        </Link>
        <Link href='/modules/design/reports' className={classNames(styles.navLink, router.asPath === '/modules/design/reports' ? styles.isActive : '')}>
            Diseño&ensp;&gt;
        </Link>
        <Link href='/modules/implementation/reports' className={classNames(styles.navLink, router.asPath === '/modules/implementation/reports' ? styles.isActive : '')}>
            Implementación&ensp;&gt;
        </Link>
      </div>
      <h1 className={styles.title}>uXcoring</h1>
    </header>
  );
};
