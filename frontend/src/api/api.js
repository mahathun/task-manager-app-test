import axios from 'axios';
var API_URL = 'http://localhost:4000';
var api = axios.create({
    baseURL: API_URL,
});
export default api;
