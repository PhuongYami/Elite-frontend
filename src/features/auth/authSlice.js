import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';

// Refresh token
export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async (_, { dispatch, rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.refreshToken();
            return response.data.token;
        } catch (error)
        {
            dispatch(logoutUser());
            return rejectWithValue('Token expired');
        }
    }
);

// Fetch current user
export const fetchCurrentUser = createAsyncThunk(
    'auth/getMe',
    async (_, { rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.getMe();
            return response.data.user;
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
            return true; // Trả về kết quả thành công
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
            const response = await authApi.register(userData);
            return response;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

// Send Mail OTP
export const sendMailOTP = createAsyncThunk(
    'auth/sendMailOTP',
    async ({ email }, { rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.sendMailOTP({ email });
            return response;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Failed to send mail OTP');
        }
    }
);

// Send Phone OTP
export const sendPhoneOTP = createAsyncThunk(
    'auth/sendPhoneOTP',
    async ({ phone }, { rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.sendPhoneOTP({ phone });
            return response;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Failed to send phone OTP');
        }
    }
);

// Verify OTP (Phone)
export const verifyPhoneOTP = createAsyncThunk(
    'auth/verifyPhoneOTP',
    async ({ phone, otp }, { rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.verifyPhone({ phone, otp });
            return response;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Phone OTP verification failed');
        }
    }
);

// Verify Email OTP
export const verifyEmailOTP = createAsyncThunk(
    'auth/verifyEmail',
    async ({ email, otpCode }, { rejectWithValue }) =>
    {
        try
        {
            const response = await authApi.verifyEmail({ email, otpCode });
            return response;
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Email OTP verification failed');
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
        setAccessToken(state, action)
        {
            state.token = action.payload;
        },
        setAuth(state, action)
        {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
            state.isAuthenticated = !!token;
        },
        clearAuth(state)
        {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },


    },
    extraReducers: (builder) =>
    {
        builder
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
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(sendMailOTP.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendMailOTP.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(sendMailOTP.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(sendPhoneOTP.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendPhoneOTP.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(sendPhoneOTP.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(verifyPhoneOTP.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyPhoneOTP.fulfilled, (state) =>
            {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(verifyPhoneOTP.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(verifyEmailOTP.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyEmailOTP.fulfilled, (state) =>
            {
                state.loading = false;
                state.message = 'Email verified successfully';
            })
            .addCase(verifyEmailOTP.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCurrentUser.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.user = action.payload; // Lưu thông tin user
                state.isAuthenticated = true;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            .addCase(refreshAccessToken.pending, (state) =>
            {
                state.loading = true;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) =>
            {
                state.token = action.payload; // Lưu access token vào Redux
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(refreshAccessToken.rejected, (state, action) =>
            {
                state.token = null; // Xóa token nếu làm mới thất bại
                state.isAuthenticated = false;
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { clearMessage, clearError, setAuth, clearAuth, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
