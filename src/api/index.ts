import axios from 'axios';
import type { AxiosInstance } from 'axios';

export const api: AxiosInstance = axios.create({
  baseURL: '/api',
});
