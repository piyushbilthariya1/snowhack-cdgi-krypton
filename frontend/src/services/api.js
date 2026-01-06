import axios from "axios";

// Create an instance with production-ready defaults
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Automatically attach the Nano Key from local storage
api.interceptors.request.use(
  (config) => {
    const nanoKey = localStorage.getItem("nano_key");
    if (nanoKey) {
      config.headers["x-nano-key"] = nanoKey;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors globally (e.g., 402 Insufficient Balance)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 402) {
        alert("Insufficient Balance! Please top up your wallet.");
      }
      if (error.response.status === 401) {
        console.error("Invalid API Key. Please log in again.");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
