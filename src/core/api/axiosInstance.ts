import axios from "axios";
import { BACKEND_BASE_URL } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
});

export default axiosInstance;
