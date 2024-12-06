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

        // Only attempt to refresh if token is expired
        if (token && isTokenExpired(token))
        {
            if (!isRefreshing)
            {
                isRefreshing = true;

                try
                {
                    const response = await authApi.refreshToken();
                    const newToken = response.data.token;

                    // Update token in Redux
                    store.dispatch(setAuth({ token: newToken }));

                    processQueue(null, newToken);
                    isRefreshing = false;

                    config.headers.Authorization = `Bearer ${ newToken }`;
                } catch (error)
                {
                    processQueue(error, null);
                    store.dispatch(clearAuth());
                    isRefreshing = false;

                    return Promise.reject(error);
                }
            } else
            {
                // If refresh is in progress, queue the request
                return new Promise((resolve, reject) =>
                {
                    failedQueue.push({ resolve, reject });
                });
            }
        }

        // Add token to request if available
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

        // Handle 401 errors
        if (error.response?.status === 401 && !originalRequest._retry)
        {
            originalRequest._retry = true;

            const state = store.getState();
            if (!state.auth.token)
            {
                return Promise.reject(error);
            }

            // Clear authentication state
            store.dispatch(clearAuth());
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;