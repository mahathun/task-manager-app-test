import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: API_URL, 
});

export default api;