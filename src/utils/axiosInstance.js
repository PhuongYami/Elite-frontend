import axios from 'axios';
import store from '../redux/store';
import { setAuth, clearAuth } from '../features/auth/authSlice';
import { isTokenExpired } from '../utils/jwtUtils';
import authApi from '../api/authApi';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api/v1',
    withCredentials: true,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) =>
{
    failedQueue.forEach(prom =>
    {
        if (error)
        {
            prom.reject(error);
        } else
        {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

axiosInstance.interceptors.request.use(
    async (config) =>
    {
        const state = store.getState();
        let token = state.auth.token;

        // Bỏ qua việc thêm token cho các request refresh token
        if (config.url.includes('/auth/refresh-token'))
        {
            return config;
        }

        // Chỉ refresh token nếu đã hết hạn
        if (token && isTokenExpired(token))
        {
            if (!isRefreshing)
            {
                isRefreshing = true;

                try
                {
                    const response = await authApi.refreshToken();
                    const newToken = response.data.token;

                    // Cập nhật token mới vào Redux
                    store.dispatch(setAuth({ token: newToken }));

                    // Xử lý các request trong queue
                    processQueue(null, newToken);
                    isRefreshing = false;

                    // Cập nhật token cho request hiện tại
                    config.headers.Authorization = `Bearer ${ newToken }`;
                } catch (error)
                {
                    // Nếu refresh token thất bại, xóa trạng thái xác thực
                    processQueue(error, null);
                    store.dispatch(clearAuth());
                    isRefreshing = false;

                    return Promise.reject(error);
                }
            } else
            {
                // Nếu đang refresh token, đưa request vào queue
                return new Promise((resolve, reject) =>
                {
                    failedQueue.push({ resolve, reject });
                });
            }
        }

        // Thêm token vào header nếu có
        if (token)
        {
            config.headers.Authorization = `Bearer ${ token }`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) =>
    {
        const originalRequest = error.config;

        // Xử lý lỗi 401 
        if (error.response?.status === 401 && !originalRequest._retry)
        {
            originalRequest._retry = true;

            const state = store.getState();
            // Kiểm tra xem có token không trước khi thử refresh
            if (!state.auth.token)
            {
                return Promise.reject(error);
            }

            try
            {
                // Thử refresh token
                const response = await authApi.refreshToken();
                const newToken = response.data.token;

                // Cập nhật token mới trong Redux
                store.dispatch(setAuth({ token: newToken }));

                // Thử lại request gốc với token mới
                originalRequest.headers.Authorization = `Bearer ${ newToken }`;
                return axiosInstance(originalRequest);
            } catch (refreshError)
            {
                // Nếu refresh token thất bại, xóa trạng thái xác thực
                store.dispatch(clearAuth());

                // Không redirect tự động để người dùng có thể thực hiện các thao tác khác
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;