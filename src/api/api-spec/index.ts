import { api } from '..';

export type apiSpecProps = {
  service: string;
  file: File;
};

export const uploadApiSpec = async (props: apiSpecProps) => {
  const formData = new FormData();
  formData.append('file', props.file as Blob);

  await api
    .post(`${props.service}/uploadApiSpec`, formData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};
