import axios from "axios";
import { message as $message } from "antd";

const axiosInstance = axios.create({
  timeout: 6000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    if (config?.data?.message) {
      // $message.success(config.data.message)
    }
    return config?.data;
  },
  (error) => {
    let errorMessage = "系统异常";
    if (error?.message?.includes("Network Error")) {
      errorMessage = "网络错误，请检查您的网络";
    }
    console.dir(error);
    error.message && $message.error(errorMessage);
    return {
      status: false,
      message: errorMessage,
      result: null,
    };
  }
);

/**
 *
 * @param method - request methods
 * @param url - request url
 * @param data - request data or params
 */
export const request = (method, url, data, config) => {
  // const prefix = '/api'
  const prefix = "";
  url = prefix + url;
  if (method === "post") {
    return axiosInstance.post(url, data, config);
  } else {
    return axiosInstance.get(url, {
      params: data,
      ...config,
    });
  }
};
