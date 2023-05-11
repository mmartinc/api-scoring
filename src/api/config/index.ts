import { api } from '..';

export type configProps = {
  service: string;
  file?: File;
};

export const getConfig = (props: configProps) => {
  const filename = `${props.service}-config`;

  api
    .get<Blob>(`${props.service}/getConfig`, {
      responseType: 'blob',
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .then((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a); // append the element to the dom
      a.click();
      a.remove(); // afterwards, remove the element
    })
    .catch((error) => {
      console.error(error);
    });
};

export const uploadConfig = (props: configProps) => {
  const formData = new FormData();
  formData.append('file', props.file as Blob);

  api
    .post(`${props.service}/uploadConfig`, formData)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};
