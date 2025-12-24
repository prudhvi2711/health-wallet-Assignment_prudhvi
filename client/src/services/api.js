import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Create an axios instance
const api = axios.create({
    baseURL: API_URL,
});

// Automatically add the JWT token to every request if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;