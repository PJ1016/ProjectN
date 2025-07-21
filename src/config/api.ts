// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const apiConfig = {
  baseUrl: API_BASE_URL,
  endpoints: {
    health: `${API_BASE_URL}/`,
    upload: `${API_BASE_URL}/upload`,
  },
};
