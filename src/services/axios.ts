import axios from 'axios';

export const httpClient = axios.create({
  baseURL: '/',
  timeout: 7000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
