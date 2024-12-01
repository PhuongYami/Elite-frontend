import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
    reducer: {
        auth: authReducer, // Xác thực
        user: userReducer, // Thông tin người dùng
    },
});

export default store;
