import axios from 'axios';
var API_URL = import.meta.env.VITE_APP_API_URL;
var api = axios.create({
    baseURL: API_URL,
});
export default api;
