import axios from "axios";

export const api = axios.create({
  baseURL: "https://gitmanagement-backend.onrender.com",
  withCredentials: true,
});

export const renderBackendApiUrl = "https://gitmanagement-backend.onrender.com";
