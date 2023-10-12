import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  credentials: "include",
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default axiosInstance;
