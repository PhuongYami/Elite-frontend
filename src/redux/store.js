import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../features/user/userSlice'; // Correct import path
import authReducer from '../features/auth/authSlice'; // Correct import path

// Persist configurations
const userPersistConfig = {
    key: 'user',
    storage,
    whitelist: ['user', 'userId', 'isAuthenticated'],
};

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'user', 'isAuthenticated'],
};

// Persist reducers
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Store configuration
export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        auth: persistedAuthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store; // Add this at the bottom

