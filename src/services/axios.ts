import Axios, { AxiosRequestConfig as RequestConfig } from "axios";
export type AxiosRequestConfig = RequestConfig<undefined>;

const baseURL = process.env.BASE_URL;

const axiosInstance = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (localStorage.getItem("token")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
