import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import { toast } from 'sonner';


// Fetch current user
export const fetchCurrentUser = createAsyncThunk(
    'user/fetchCurrentUser',
    async (_, { rejectWithValue }) =>
    {
        try
        {
            const response = await userApi.getCurrentUser();
            return response.data.data; // Return user object
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch current user');
        }
    }
);

// Update current user
export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userData, { rejectWithValue }) =>
    {
        try
        {
            const response = await userApi.updateUser(userData);
            return response.data.data; // Return updated user object
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Failed to update user');
        }
    }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
    'user/updateUserProfile',
    async (profileData, { rejectWithValue }) =>
    {
        try
        {
            const response = await userApi.updateUserProfile(profileData);
            return response.data.data; // Return updated profile object
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
        }
    }
);
// Change user password
export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (passwordData, { rejectWithValue }) =>
    {
        try
        {
            const response = await userApi.changePassword(passwordData);
            return response.data.message; // Assuming backend returns a success message
        } catch (error)
        {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    });

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        userId: null
    },
    reducers: {
        clearError(state)
        {
            state.error = null;
        },
    },
    extraReducers: (builder) =>
    {
        builder
            // Fetch current user
            .addCase(fetchCurrentUser.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.user = action.payload;
                state.userId = action.payload._id;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            // Update current user
            .addCase(updateUser.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(updateUser.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })

            // Update user profile
            .addCase(updateUserProfile.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.user.profile = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.payload;
            })
            // Change password
            .addCase(changePassword.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) =>
            {
                state.loading = false;
                toast.success('Password changed successfully!');
            })
            .addCase(changePassword.rejected, (state, action) =>
            {
                state.error = action.payload;
                state.loading = false;
                toast.error(action.payload || 'Failed to change password');
            });
    },
});

export const { clearError } = userSlice.actions;
export default userSlice.reducer;
