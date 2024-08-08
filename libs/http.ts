import axios, { AxiosRequestConfig } from "axios";

const options = {
  baseUrl: "https://pokeapi.co/api/v2",
  credentials: true,
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
};

const request = axios.create(options);

request.interceptors.request.use(
  (config) => {
    const accessToken = "haonc";
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const http = {
  get: async (url: string, data = {}, config?: AxiosRequestConfig) => {
    const response = await request.get(url, config);
    return response;
  },
  post: async (url: string, data = {}, config?: AxiosRequestConfig) => {
    const formData = {};
    Object.assign(formData, {}, data);
    const response = await request.post(url, formData, config);
    return response;
  },
};

export default http;
