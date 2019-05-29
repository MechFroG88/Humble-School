import { getToken, setToken } from '@/api/auth';
import axios from 'axios';
import qs from 'qs';

const local = 'http://mechfrog88.ddns.net/';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api/' : local,
  transformRequest: [(data, headers) => {
    if (headers['Content-Type'] === 'multipart/form-data') {
      return data;
    }
    return qs.stringify(data);
  }],
  withCredentials: true,
});

service.interceptors.request.use((config) => {
  config.headers.Authorization = getToken() ? getToken() : (window.token ? window.token : '');
  return config;
}, error => Promise.reject(error));

service.interceptors.response.use(response =>{
  if (response.data.data.token) 
    setToken(response.data.data.token);
  return response;
}, error => Promise.reject(error));

export default service;