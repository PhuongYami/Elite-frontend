import axios from 'axios';
import store from '../redux/store';
import { setAuth, clearAuth } from '../features/auth/authSlice';
import { isTokenExpired } from '../utils/jwtUtils';
import authApi from '../api/authApi'
import { toast } from 'react-toastify';

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
    failedQueue.forEach((prom) =>
    {
        if (error)
        {
            prom.reject(error);
        } else
        {
            prom.resolve((config) => ({
                ...config,
                headers: {
                    ...config.headers,
                    Authorization: `Bearer ${ token }`,
                },
            }));
        }
    });
    failedQueue = [];
};

axiosInstance.interceptors.request.use(
    async (config) =>
    {
        const state = store.getState();
        let token = state.auth.token;

        if (config.url.includes('/auth/refresh-token'))
        {
            return config;
        }

        if (token && isTokenExpired(token))
        {
            if (!isRefreshing)
            {
                isRefreshing = true;

                try
                {
                    const response = await authApi.refreshToken();
                    const newToken = response.data.token;

                    store.dispatch(setAuth({ token: newToken }));
                    processQueue(null, newToken);
                    isRefreshing = false;

                    return {
                        ...config,
                        headers: {
                            ...config.headers,
                            Authorization: `Bearer ${ newToken }`,
                        },
                    };
                } catch (error)
                {
                    processQueue(error, null);
                    store.dispatch(clearAuth());
                    toast.error('Your session has expired. Please log in again.');
                    isRefreshing = false;
                    return Promise.reject(error);
                }
            } else
            {
                return new Promise((resolve, reject) =>
                {
                    failedQueue.push({
                        resolve: (configUpdateFn) => resolve(configUpdateFn(config)),
                        reject,
                    });
                });
            }
        }

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

        // Handle 401 and 403 errors for refresh token
        if (
            (error.response?.status === 401 || error.response?.status === 403) &&
            originalRequest.url.includes('/auth/refresh-token')
        )
        {
            // Clear authentication state
            store.dispatch(clearAuth());
            window.location.href = '/login'; // Redirect to login
            return Promise.reject(error);
        }

        // Handle other 401 errors
        if (error.response?.status === 401 && !originalRequest._retry)
        {
            originalRequest._retry = true;

            const state = store.getState();
            if (!state.auth.token)
            {
                return Promise.reject(error);
            }

            try
            {
                const response = await authApi.refreshToken();
                const newToken = response.data.token;

                // Update token in Redux
                store.dispatch(setAuth({ token: newToken }));
                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${ newToken }`;
                return axiosInstance(originalRequest);
            } catch (refreshError)
            {
                store.dispatch(clearAuth());
                window.location.href = '/login'; // Redirect to login
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
