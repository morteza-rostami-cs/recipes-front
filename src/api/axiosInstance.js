// src/api/axiosInstance.js
import axios from "axios";
// import { toast } from "@chakra-ui/react";
import toast from "react-hot-toast";

// Base URL
import { API_BASE_URL } from "../config/config";

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // Sends cookies (JWT) with every request
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Auto-detect content type
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (config.data && typeof config.data === "object") {
      config.headers["Content-Type"] = "application/json";
    }

    // Optional: Add auth header if needed later
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;

    console.log(
      "API Request →",
      config.method.toUpperCase(),
      config.url,
      config.data
    );
    return config;
  },
  (error) => {
    console.error("Request Error →", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    console.log("API Success →", response.status, response.config.url);
    return response;
  },
  (error) => {
    const { response, config } = error;

    // Centralized error handling
    let message = "Something went wrong. Please try again.";

    if (response) {
      const { data, status } = response;

      // Handle WP REST API errors
      if (data?.message) {
        message = data.message;
      } else if (data?.code) {
        message = `${data.code}: ${data.message || "Unknown error"}`;
      }

      // Specific status codes
      switch (status) {
        case 401:
          message = "Session expired. Please log in again.";
          // Optional: redirect to login
          // window.location.href = "/login";
          break;
        case 403:
          message = "You don't have permission to do this.";
          break;
        case 404:
          message = "Resource not found.";
          break;
        case 500:
          message = "Server error. Try again later.";
          break;
      }
    } else if (error.code === "ECONNABORTED") {
      message = "Request timed out. Check your connection.";
    } else if (!navigator.onLine) {
      message = "No internet connection.";
    }

    // Show toast (only once per error)
    if (!config._toastShown) {
      // toast.error(message, {
      //   duration: 5000,
      //   position: "top-center",
      // });
      config._toastShown = true;
    }

    console.error("API Error →", status, message, error);
    return Promise.reject(error);
  }
);

export default api;
