// src/config/api.js
/**
 * API Config – Vite Only
 * Uses import.meta.env only (no process)
 */

const ENV = {
  NODE_ENV: import.meta.env.VITE_NODE_ENV || "development",
  API_URL_DEV: import.meta.env.VITE_API_URL_DEV,
  API_URL_PROD: import.meta.env.VITE_API_URL_PROD,
};

const isProd = ENV.NODE_ENV === "production";

console.log(ENV.API_URL_DEV);
if (!ENV.API_URL_DEV || !ENV.API_URL_PROD) {
  throw new Error(
    `Missing API URL for ${isProd ? "production" : "development"}.\n` +
      `Add to .env files:\n` +
      `   VITE_API_URL_DEV=http://localhost:10016/wp-json\n` +
      `   VITE_API_URL_PROD=https://yourdomain.com/wp-json`
  );
}

export const API_BASE_URL = isProd ? ENV.API_URL_PROD : ENV.API_URL_DEV;

export const config = {
  nodeEnv: ENV.NODE_ENV,
  isProd,
  API_BASE_URL,
};
