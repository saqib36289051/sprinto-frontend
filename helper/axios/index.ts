import axiosClientInstance from "./axios-clientside-instance";
import axiosServerInstance from "./axios-serverside-instance";

const axiosInstance =
  typeof window === "undefined" ? axiosServerInstance : axiosClientInstance;

export default axiosInstance;