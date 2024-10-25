import axios from "axios";
import { getCookie, setCookie } from "cookies-next"; // Use cookies-next for client-side cookie management
import { BASE_URL } from "@/redux";

const axiosClientInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

const getAccessToken = () => getCookie("token");

// const saveToken = (accessToken: string) => {
//   setCookie("token", accessToken); // Save the token to cookies
// };

axiosClientInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Remove refresh token logic for simplification

// Add a response interceptor to handle unauthorized errors
axiosClientInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - Token may be invalid or expired");
      // Handle unauthorized access (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);

export default axiosClientInstance;
