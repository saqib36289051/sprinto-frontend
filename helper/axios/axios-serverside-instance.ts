"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { BASE_URL } from "@/redux";

const axiosServerInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

const getAccessToken = () => cookies().get("token")?.value

// const saveToken = (accessToken: string) => {
//   cookies().set("token", accessToken);
// };

axiosServerInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401 errors
axiosServerInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - Token may be invalid or expired");
      // Handle unauthorized access (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);

export default axiosServerInstance;
