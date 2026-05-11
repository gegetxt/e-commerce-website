import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

export function setAuthToken(token) {
  api.defaults.headers.common.Authorization = token;
}

export function clearAuthToken() {
  delete api.defaults.headers.common.Authorization;
}
