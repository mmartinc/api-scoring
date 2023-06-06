import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from './report.module.css';
import IframeResizer from 'iframe-resizer-react';
import {
  getApiSpec,
  getHTMLReport,
  getSpecificationList,
} from '~/api/html-report';
import { Sidebar } from '~/components/sidebar';
import { ScrollArea } from '~/components/scroll-area';
import classNames from 'classnames';
import { Header } from '~/components/header';
import error from 'next/error';
import { CodeBlock } from '~/components/code-block';

const SpectralReport: NextPage = () => {
  const [html, setHTML] = useState({ __html: '<h1>Cargando...</h1>' });
  const [specList, setSpecList] = useState<string[]>();
  const [selectedFile, setSelectedFile] = useState<string>();
  const [code, setCode] = useState<string>();
  const [isReportOnDisplay, setIsReportOnDisplay] = useState(true);

  useEffect(() => {
    async function loadSpecList() {
      const response = await getSpecificationList({ service: 'spectral' });
      if (response) {
        setSpecList(response);
      }
      if (response && response.length > 0) {
        setSelectedFile(response[0]);
      }
      console.log(response);
    }
    void loadSpecList();
  }, []);

  useEffect(() => {
    async function createMarkup(filename?: string) {
      if (filename === undefined) {
        return;
      }

      try {
        const apiResponse = await getHTMLReport({
          service: 'spectral',
          filename: filename,
        }).then((response) => {
          if (typeof response !== 'string') throw error;
          return response;
        });

        setHTML({ __html: apiResponse });
      } catch (error) {
        console.error(error);
        setHTML({ __html: '<h1>Hubo un error al cargar el reporte</h1>' });
      }
    }

    async function getSpecFile(filename?: string) {
      if (filename === undefined) return;

      try {
        const apiResponse = await getApiSpec({
          service: 'spectral',
          filename: filename,
        }).then((response) => {
          if (typeof response !== 'string') throw error;
          return response;
        });

        setCode(apiResponse);
      } catch (error) {
        console.error(error);
        setCode('Hubo un error al cargar el archivo');
      }
    }
    setHTML({ __html: '<h1>Cargando...</h1>' });
    void createMarkup(selectedFile);
    void getSpecFile(selectedFile);
  }, [selectedFile]);

  return (
    <>
      <Head>
        <title>uXcoring | Informes de Diseño</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.container}>
        <Header />
        {specList && specList?.length === 0 && (
          <div className={styles.noSpecs}>
            <h1>No hay especificaciones cargadas</h1>
            <p>
              Para cargar una especificación, acceda a la sección
              <b> Validar diseño</b> o<b> Validar implementación</b> desde la
              <b> página de inicio</b>.
            </p>
          </div>
        )}
        {specList && specList?.length > 0 && (
          <div className={styles.content}>
            <div>
              <Sidebar>
                <ScrollArea>
                  <div className={styles.sidebarItems}>
                    {specList?.map((spec) => (
                      <div
                        key={spec}
                        className={classNames(
                          styles.sidebarItem,
                          spec === selectedFile && styles.sidebarItemSelected
                        )}
                        onClick={() => setSelectedFile(spec)}
                      >
                        {spec}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Sidebar>
            </div>
            <main
              className={classNames(
                styles.main,
                !isReportOnDisplay ? styles.codeOnly : ''
              )}
            >
              <ScrollArea>
                <CodeBlock
                  code={code ?? ''}
                  onCodeChange={(code) => setCode(code)}
                />
              </ScrollArea>
              <div
                className={styles.revealButton}
                onClick={() => setIsReportOnDisplay(!isReportOnDisplay)}
              >
                {isReportOnDisplay ? '>' : '<'}
              </div>
              <ScrollArea>
                <IframeResizer
                  // log
                  heightCalculationMethod='lowestElement'
                  srcDoc={html.__html}
                  className={styles.iframe}
                  checkOrigin={false}
                  scrolling
                />
              </ScrollArea>
            </main>
          </div>
        )}
      </div>
    </>
  );
};

export default SpectralReport;
