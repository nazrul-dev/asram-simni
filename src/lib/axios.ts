import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { getSession } from "next-auth/react";
import https from "https";

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  }),
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig | any) => {
    const session:any = await getSession() || {};
  
    if (session?.accessToken) {
      config.headers["x-access-token"] = session?.accessToken;
    }
 
    config.data = JSON.stringify(config.data);
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
    };
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk response
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Tidak perlu mengubah response
    return response;
  },
  (error: any) => {
    // Tangani error di sini
    return Promise.reject(error);
  }
);

// Ekspor instance axios yang telah dibuat
export default axiosInstance;
