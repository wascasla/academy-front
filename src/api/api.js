import axios from "axios";

const axiosBaseConfig = {
  baseURL: 'http://localhost:5000',
  timeout: 1000 * 20,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(axiosBaseConfig);

export default instance;