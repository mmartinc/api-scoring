import styles from './portman.module.css';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { uploadApiSpec } from '~/api/api-spec';
import { getConfig, uploadConfig } from '~/api/config';
import { Button } from '~/components/button';
import { DownloadIcon } from '~/components/download-icon';
import { ProgressBar } from '~/components/progress-bar';
import { StepSection } from '~/components/step-section';

const Portman: NextPage = () => {
  const [configFile, setConfigFile] = useState<File>();
  const [specificationFiles, setSpecificationFiles] = useState<FileList>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const submitFiles = async () => {
    if (!configFile) return;
    if (!specificationFiles) return;
    if (
      configFile.type !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
      return;

    setIsSubmitting(true);
    setProgress(0);

    uploadConfig({ service: 'portman', file: configFile });

    for (const specificationFile of specificationFiles) {
      if (!specificationFile.name.endsWith('.yaml') || !specificationFile.name.endsWith('.yml')) {
        console.log(
          `Skipping ${specificationFile.name} because it is not a YAML file.`
        );
        setProgress((prev) => prev + 1);
        continue;
      }
      setProgress((prev) => prev + 1);
      console.log(`Uploading ${specificationFile.name}...`);
      await uploadApiSpec({ service: 'portman', file: specificationFile });
      console.log(`Uploaded ${specificationFile.name}! Waiting 2 seconds...`);
    }

    console.log('Done!');
    setIsSubmitting(false);

    await router.push({
      pathname: '/modules/implementation/reports',
    });
  };

  return (
    <>
      <Head>
        <title>uXcoring | Implementación</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href='/'>
            <Image
              src='/logo.png'
              alt='Logo'
              width={200}
              height={25}
              className={styles.companyLogo}
            />
          </Link>
          <h1 className={styles.title}>Evaluación de Implementación de APIs</h1>
          <div className={styles.steps}>
            <StepSection stepLabel='Paso 1' stepDescription=''>
              <div className={styles.downloadSection}>
                <span>Descargue la plantilla de configuración:</span>
                <div className={styles.downloadButton}>
                  <Button className={styles.button} onClick={() => getConfig({ service: 'portman' })}>
                    <DownloadIcon />
                  </Button>
                </div>
              </div>
            </StepSection>
            <StepSection
              stepLabel='Paso 2'
              stepDescription='Rellene la plantilla de configuración y súbala aquí:'
            >
              <input
                type='file'
                className={styles.inputField}
                accept='.xlsx'
                onChange={(e) => setConfigFile(e.target.files?.[0])}
              />
            </StepSection>
            <StepSection
              stepLabel='Paso 3'
              stepDescription='Suba la especificación o especificaciones a validar aquí:'
            >
              <input
                type='file'
                className={styles.inputField}
                accept='.yaml, .yml'
                multiple
                onChange={(e) =>
                  setSpecificationFiles(e.target.files ?? undefined)
                }
              />
            </StepSection>
            <div className={styles.buttonLink}>
              {isSubmitting ? (
                <>
                  <ProgressBar
                    value={progress}
                    max={specificationFiles?.length}
                  />
                  {progress === 0 ? (
                    <span>Subiendo configuración...</span>
                  ) : (
                    <span>
                      Procesando{' '}
                      {specificationFiles &&
                        specificationFiles[progress - 1]?.name}
                      ...
                    </span>
                  )}
                </>
              ) : (
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                <Button submit onClick={submitFiles} className={styles.submitButton}>
                  Generar reporte
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Portman;
