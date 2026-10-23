import axios from 'axios';

// When running locally in development (Vite), /api is proxied to http://127.0.0.1:5000.
// On Vercel, use the live backend tunnel URL to save directly into your MongoDB!
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const baseURL = isLocal
  ? '/api'
  : (import.meta.env.VITE_API_URL || 'https://peoplepulse-api.loca.lt/api');

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'bypass-tunnel-reminder': 'true',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('peoplepulse_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('peoplepulse_token');
      localStorage.removeItem('peoplepulse_user');
      if (window.location.pathname !== '/login' && !window.location.pathname.endsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
