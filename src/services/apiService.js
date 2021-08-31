import axios from "axios";
import { store } from "../store/store";
import { setIsAuthenticated } from "../store/reducers/appSlice";
const API_HOST = "http://localhost:8080";

const apiService = {
  get: (url) => {
    return axios({ method: "get", url: `${API_HOST}${url}` });
  },
  post: (url, data) => {
    return axios({ method: "post", url: `${API_HOST}${url}`, data });
  },
};
export default apiService;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("userDetails");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("userDetails");
      store.dispatch(setIsAuthenticated(false));
    }
    return Promise.reject(error);
  }
);
