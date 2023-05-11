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
        <title>AxPI Scoring</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>AxPI Scoring</h1>
          <Image
            src='/logo.png'
            alt='Company Logo'
            width={500}
            height={60}
            className={styles.companyLogo}
          />
          <div className={styles.cardRow}>
            <Link className={styles.card} href='/modules/design'>
              <h3 className={styles.cardTitle}>Validar Diseño →</h3>
              <div className={styles.cardText}>
                Evaluación del diseño de APIs
              </div>
            </Link>
            <Link className={styles.card} href='/modules/implementation'>
              <h3 className={styles.cardTitle}>Validar Implementación →</h3>
              <div className={styles.cardText}>
                Evaluación de la implementación de APIs
              </div>
            </Link>
            <Link
              className={classNames(styles.card, styles.longCard)}
              href='/modules/design/reports'
            >
              <h3 className={styles.cardTitle}>Ver Informes →</h3>
              <div className={styles.cardText}>Ver informes de evaluación</div>
            </Link>
          </div>
          <div className={styles.cardRow}></div>
        </div>
      </main>
    </>
  );
};

export default Home;
