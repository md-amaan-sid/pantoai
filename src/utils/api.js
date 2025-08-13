import axios from "axios";

const api = axios.create({
  baseURL: "https://gitmanagement-backend.onrender.com",
  withCredentials: true,
});

const renderBackendApiUrl = "https://gitmanagement-backend.onrender.com";

export default { api, renderBackendApiUrl };
