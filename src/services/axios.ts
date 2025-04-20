import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_TIMELI_BE_URL,
  timeout: 7000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
