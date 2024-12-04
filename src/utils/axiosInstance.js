// src/utils/axiosInstance.js
import axios from 'axios';
import store from '../redux/store';
import { setAuth, clearAuth } from '../features/auth/authSlice';
import { isTokenExpired } from '../utils/jwtUtils';
import authApi from '../api/authApi'
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1',
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (config) =>
    {
        const state = store.getState();
        let token = state.auth.token;

        if (token && isTokenExpired(token))
        {
            try
            {
                // Làm mới token
                const response = await authApi.refreshToken(); // Gọi API làm mới token
                token = response.data.token;

                // Cập nhật token mới vào Redux store
                store.dispatch(setAuth({ token }));

                // Thêm token mới vào header Authorization
                config.headers.Authorization = `Bearer ${ token }`;
            } catch (error)
            {
                console.error('Failed to refresh token:', error);
                store.dispatch(clearAuth()); // Xóa thông tin nếu làm mới thất bại
                throw error;
            }
        } else if (token)
        {
            config.headers.Authorization = `Bearer ${ token }`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) =>
    {
        if (error.response?.status === 401)
        {
            console.error('Unauthorized: Clearing auth');
            store.dispatch(clearAuth()); // Xóa thông tin nếu nhận lỗi 401
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;
