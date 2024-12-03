// src/utils/axiosInstance.js
import axios from 'axios';
import store from '../redux/store';
import { logoutUser } from '../features/auth/authSlice';

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
        const state = store.getState(); // Lấy state từ Redux store
        const token = state.auth.token;
        if (token)
        {
            config.headers.Authorization = `Bearer ${ token }`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
// Interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) =>
    {
        if (error.response?.status === 401)
        {
            // Dispatch logout action
            store.dispatch(logoutUser());
            window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
