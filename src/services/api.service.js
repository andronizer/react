import axios from "axios";
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
