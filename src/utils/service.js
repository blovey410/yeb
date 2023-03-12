import axios from "axios"
import { ElLoading } from 'element-plus'

const service = axios.create({
  timeout: 2000
})
const loadingInstance =null;

service.interceptors.request.use(config => {
  loadingInstance = ElLoading.service({
    locak: true,
    text: "loading",
    background: "rgbd(0,0,0,0.7)",
  });
  return config;
}, error => {
  Promise.reject(error);
});

service.interceptors.response.use(resp =>{
  loadingInstance.close();
  return resp.data;
}, error => {
  Promise.reject(error);
});

export const request = (config, method) => {
  return service({
    ...config,
    method: method,
    data: config.data,
  });
};