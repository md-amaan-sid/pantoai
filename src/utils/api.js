import axios from "axios";

const api = axios.create({
  baseURL: "https://gitmanagement-backend.onrender.com",
  withCredentials: true,
});

export default api;
