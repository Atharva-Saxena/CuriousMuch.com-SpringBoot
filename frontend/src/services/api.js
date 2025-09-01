import axios from 'axios';

const API_BASE_URL = 'http://localhost:8082/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token (will implement JWT later)
api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId'); // Temporary - replace with JWT
  if (userId) {
    config.headers['User-Id'] = userId;
  }
  return config;
});

export default api;