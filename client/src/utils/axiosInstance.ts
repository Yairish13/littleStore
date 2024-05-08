import axios, { AxiosInstance } from 'axios';
import { authHeader } from './helpers';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/v1/',
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  authHeader()
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
