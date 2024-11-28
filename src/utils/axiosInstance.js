// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptors nếu cần
axiosInstance.interceptors.request.use(
    (config) =>
    {
        // Gắn token vào header nếu cần
        const token = localStorage.getItem('token');
        if (token)
        {
            config.headers.Authorization = `Bearer ${ token }`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
