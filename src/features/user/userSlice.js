import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

// Thunk to fetch the current user's information
export const fetchCurrentUser = createAsyncThunk(
    'user/fetchCurrentUser',
    async (_, { rejectWithValue }) =>
    {
        try
        {
            const response = await userApi.getCurrentUser();
            console.log('API response:', response.data);
            return response.data; // Return the user data from API
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch user information.');
        }
    }
);

// Thunk to update the current user's information
export const updateUserInfo = createAsyncThunk(
    'user/updateUserInfo',
    async (userData, { rejectWithValue }) =>
    {
        try
        {
            const response = await userApi.updateUser(userData);
            return response.data; // Return the updated user data
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Failed to update user information.');
        }
    }
);

// Thunk to update the current user's profile
export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async (profileData, { rejectWithValue }) =>
    {
        try
        {
            const response = await userApi.updateUserProfile(profileData);
            return response.data; // Return the updated profile data
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Failed to update profile.');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        loading: false,
        error: null,
    },
    reducers: {
        // Example of synchronous actions (if needed in the future)
    },
    extraReducers: (builder) =>
    {
        builder
            // Handle fetchCurrentUser
            .addCase(fetchCurrentUser.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.userInfo = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle updateUserInfo
            .addCase(updateUserInfo.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.userInfo = { ...state.userInfo, ...action.payload }; // Merge updated data
            })
            .addCase(updateUserInfo.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            // Handle updateUserProfile
            .addCase(updateUserProfile.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.userInfo = { ...state.userInfo, profile: action.payload }; // Update profile in userInfo
            })
            .addCase(updateUserProfile.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
