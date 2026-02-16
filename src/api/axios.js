import axios from "axios";

export const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

// ✅ Token header set
export function setAuthToken(token) {
  api.defaults.headers.common["Authorization"] = token; // ❗ Bearer yok
}

// ✅ Token header clear
export function clearAuthToken() {
  delete api.defaults.headers.common["Authorization"];
}