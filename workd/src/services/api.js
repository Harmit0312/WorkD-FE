import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/WorkD-BE",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
