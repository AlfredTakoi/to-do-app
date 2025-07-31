import axios from 'axios';

const API = axios.create({
  baseURL: 'http://94.74.86.174:8080/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
