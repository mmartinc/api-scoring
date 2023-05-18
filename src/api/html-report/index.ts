import { api } from '..';

export type getHTMLReportProps = {
  service: string;
  filename?: string | string[];
};

export const getHTMLReport = async (props: getHTMLReportProps) => {
  const response: string | void = await api
    .post<string>(`${props.service}/result`, {
      specification_name: props.filename,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });

  return response;
};

export const getSpecificationList = async (props: getHTMLReportProps) => {
  const response: string[] | void = await api
    .get<string[]>(`${props.service}/list`)
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });

  return response;
};

export const getApiSpec = async (props: getHTMLReportProps) => {
  const response: string | void = await api
    .post<string>(`${props.service}/result/yaml`, {
      specification_name: props.filename,
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(error);
    });

  return response;
};
