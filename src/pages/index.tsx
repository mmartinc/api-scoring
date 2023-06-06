import styles from './index.module.css';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>uXcoring</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
        <div className={styles.container}>
          <h1 className={styles.title}>uXcoring</h1>
          <Image
            src='/logo.png'
            alt='Company Logo'
            width={500}
            height={60}
            className={styles.companyLogo}
          />
          <div className={styles.cardRow}>
            <Link className={styles.card} href='/modules/design'>
              <h2 className={styles.cardTitle}>Validar Diseño&ensp;&gt;</h2>
              <div className={styles.cardText}>
                Evaluación del diseño de APIs
              </div>
            </Link>
            <Link className={styles.card} href='/modules/implementation'>
              <h2 className={styles.cardTitle}>Validar Implementación&ensp;&gt;</h2>
              <div className={styles.cardText}>
                Evaluación de la implementación de APIs
              </div>
            </Link>
            <Link
              className={classNames(styles.card, styles.longCard)}
              href='/modules/design/reports'
            >
              <h2 className={styles.cardTitle}>Ver Informes&ensp;&gt;</h2>
              <div className={styles.cardText}>Ver informes de evaluación</div>
            </Link>
          </div>
          <div className={styles.cardRow}></div>
        </div>
    </>
  )
};

export default Home;
