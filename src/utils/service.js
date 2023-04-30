import axios from 'axios';
import { ElLoading } from 'element-plus';
import { useStore } from '../store/index';

const service = axios.create({
  timeout: 2000,
  baseURL: import.meta.env.VITE_BASE_API_URL,
});
let loadingInstance = null;
const store = useStore();
service.interceptors.request.use(
  config => {
    loadingInstance = ElLoading.service({
      locak: true,
      text: 'loading',
      background: 'rgbd(0,0,0,0.7)',
    });
    if (store.Authorization) {
      config.headers['Authorization'] = store.Authorization;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  resp => {
    loadingInstance.close();
    return resp.data;
  },
  error => {
    Promise.reject(error);
  }
);

export const request = (config, method) => {
  return service({
    ...config,
    method: method,
    data: config.data,
  });
};
