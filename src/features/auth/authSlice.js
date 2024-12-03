import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';

// Refresh token
export const checkTokenExpiration = createAsyncThunk(
    'auth/checkTokenExpiration',
    async (_, { dispatch, rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.refreshToken();
            return response.data;
        } catch (error)
        {
            dispatch(logoutUser());
            return rejectWithValue('Token expired');
        }
    }
);
export const fetchCurrentUser = createAsyncThunk(
    'auth/getMe',
    async (_, { getState, rejectWithValue }) =>
    {
        const token = getState().auth.token; // Lấy token từ Redux store
        if (!token) return rejectWithValue('No token available');

        try
        {
            const response = await authApi.getMe(token); // Gọi API lấy thông tin người dùng
            return response.data;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user');
        }
    }
);
// Login
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.login({ email, password });
            return response.data;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Login failed');
        }
    }
);

// Logout
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) =>
    {
        try
        {
            await authApi.logout();
            return true;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Logout failed');
        }
    }
);

// Register
export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) =>
    {
        try
        {
            const { data } = await authApi.register(userData);
            return data;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

// Send OTP
export const sendOTP = createAsyncThunk(
    'auth/sendOTP',
    async (data, { rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.sendOTP(data);
            return response.data;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Failed to send OTP');
        }
    }
);

// Verify OTP
export const verifyOTP = createAsyncThunk(
    'auth/verifyOTP',
    async (data, { rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.verifyOTP(data);
            return response.data;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
        }
    }
);

// Verify Email
export const verifyEmail = createAsyncThunk(
    'auth/verify-email',
    async (data, { rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.verifyEmail(data);
            return response.data;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Email verification failed');
        }
    }
);

// Reset Password
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ resetToken, data }, { rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.resetPassword(resetToken, data);
            return response.data;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Password reset failed');
        }
    }
);

// Reset Password by Phone
export const resetPasswordByPhone = createAsyncThunk(
    'auth/resetPasswordByPhone',
    async (data, { rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.resetPasswordByPhone(data);
            return response.data;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Password reset by phone failed');
        }
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
        message: null,
    },
    reducers: {
        clearMessage(state)
        {
            state.message = null;
        },
        clearError(state)
        {
            state.error = null;
        },
        setAuth: (state, action) =>
        {
            const { user, token } = action.payload;
            state.isAuthenticated = true;
            state.user = user;
            state.token = token;
        },
    },
    extraReducers: (builder) =>
    {
        builder
            // Register
            .addCase(registerUser.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            // Login
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
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            // Logout
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
            })
            .addCase(logoutUser.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            // Send OTP
            .addCase(sendOTP.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOTP.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(sendOTP.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            // Verify OTP
            .addCase(verifyOTP.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state) =>
            {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(verifyOTP.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            // Verify Email
            .addCase(verifyEmail.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(verifyEmail.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            // Reset Password
            .addCase(resetPassword.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(resetPassword.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            // Reset Password by Phone
            .addCase(resetPasswordByPhone.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPasswordByPhone.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(resetPasswordByPhone.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })
            //get Me
            .addCase(fetchCurrentUser.fulfilled, (state, action) =>
            {
                state.isAuthenticated = true;
                state.user = action.payload.user;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) =>
            {
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                state.error = action.payload;
            })
    },
});

export const { clearMessage, clearError, setAuth } = authSlice.actions;

export default authSlice.reducer;
