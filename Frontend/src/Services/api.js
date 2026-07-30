import axios from "axios";
// import VITE_API_BASE_URL from "../.env";
import authStorage from "../Utils/authStorage";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});
// 
// =========================
// Request Interceptor
// =========================
api.interceptors.request.use(
  (config) => {
    const token = authStorage.getToken();

    if (authStorage.isAuthenticated() && token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      authStorage.clearAuth();
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// =========================
// Response Interceptor
// =========================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          authStorage.clearAuth();
          window.dispatchEvent(new Event("auth:expired"));
          break;

        case 403:
          console.error("Forbidden");
          break;

        case 404:
          console.error("Resource not found");
          break;

        case 500:
          console.error("Internal Server Error");
          break;

        default:
          console.error(error.response.data?.message || "Something went wrong");
      }
    } else if (error.request) {
      console.error("Server is unreachable.");
    } else {
      console.error(error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
