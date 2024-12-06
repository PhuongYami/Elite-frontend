import axiosInstance from '../utils/axiosInstance';

const userApi = {
    // Get current user's information
    getCurrentUser: () => axiosInstance.get('/user/me'),

    // Update current user's information
    updateUser: (data) => axiosInstance.put('/user/update', data),

    // Get all users (Admin only)
    getAllUsers: () => axiosInstance.get('/user/list'),

    // Get user details by ID
    getUserById: (userId) => axiosInstance.get(`/user/${ userId }`),

    // Delete a user (Admin only)
    deleteUser: (userId) => axiosInstance.delete(`/user/${ userId }`),

    // Update current user's profile
    updateUserProfile: (data) => axiosInstance.put('/user/profile/update', data),
};

export default userApi;
