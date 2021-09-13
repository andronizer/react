import axios from "axios";
import { store } from "../store/store";
import { setIsAuthenticated } from "../store/reducers/appSlice";
const API_HOST = "http://localhost:8080";

const apiService = {
  get: (url) => {
    return axios({ method: "get", url: `${API_HOST}${url}` }).then(
      (res) => res.data
    );
  },
  post: (url, data) => {
    return axios({ method: "post", url: `${API_HOST}${url}`, data }).then(
      (res) => res.data
    );
  },
  put: (url, data) => {
    return axios({ method: "put", url: `${API_HOST}${url}`, data }).then(
      (res) => res.data
    );
  },
  delete: (url, data) => {
    return axios({ method: "delete", url: `${API_HOST}${url}`, data }).then(
      (res) => res.data
    );
  },
};
export default apiService;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("access_token");
      store.dispatch(setIsAuthenticated(false));
    }
    return Promise.reject(error);
  }
);
