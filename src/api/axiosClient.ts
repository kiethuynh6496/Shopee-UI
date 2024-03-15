import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import tokenApi from './tokenApi';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_GATEWAY_URL || 'https://myshopeeapi.azurewebsites.net/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Do something before request is sent
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refreshToken');
  try {
    const res = await tokenApi.refreshToken(refresh_token);
    if (res.statusCode === 201) {
      console.log(res.data.accessToken);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('refreshToken', res.data.refreshToken);
      localStorage.setItem('expiresAt', res.data.expiresAt);
      return res.data.accessToken;
    }
  } catch (error) {
    console.log(error);
  }
};

export default axiosClient;
