import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';

// Thunk to handle login
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.login({ email, password });
            return response.data; // Return response data if login is successful
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Thunk to handle logout
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) =>
    {
        try
        {
            await authApi.logout(); // Call logout API
            return true; // Indicate success
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        isAuthenticated: !!localStorage.getItem('token'),
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) =>
    {
        builder
            // Handle login
            .addCase(loginUser.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle logout
            .addCase(logoutUser.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) =>
            {
                state.loading = false;
                state.token = null;
                state.isAuthenticated = false;
                localStorage.removeItem('token');
            })
            .addCase(logoutUser.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default authSlice.reducer;
