import axiosInstance from '../utils/axiosInstance';

const userApi = {
    /**
     * Lấy thông tin người dùng hiện tại.
     * @returns {Promise} Kết quả API trả về.
     */
    getCurrentUser: () => axiosInstance.get('/user/me'),

    /**
     * Cập nhật thông tin người dùng.
     * @param {Object} data - Dữ liệu cần cập nhật ({ firstName, lastName, dateOfBirth, ... }).
     * @returns {Promise} Kết quả API trả về.
     */
    updateUser: (data) => axiosInstance.put('/user/update', data),

    /**
     * Thay đổi mật khẩu của người dùng.
     * @param {Object} data - Dữ liệu đổi mật khẩu ({ oldPassword, newPassword }).
     * @returns {Promise} Kết quả API trả về.
     */
    changePassword: (data) => axiosInstance.put('/user/change-password', data),

    /**
     * Lấy danh sách người dùng (dành cho admin hoặc mục đích khác).
     * @param {Object} params - Tham số lọc danh sách ({ page, limit, search }).
     * @returns {Promise} Kết quả API trả về.
     */
    getUsers: (params) => axiosInstance.get('/user/list', { params }),

    /**
     * Lấy chi tiết một người dùng.
     * @param {String} userId - ID người dùng cần lấy thông tin.
     * @returns {Promise} Kết quả API trả về.
     */
    getUserById: (userId) => axiosInstance.get(`/user/${ userId }`),

    /**
     * Xóa tài khoản người dùng (chỉ dành cho admin).
     * @param {String} userId - ID người dùng cần xóa.
     * @returns {Promise} Kết quả API trả về.
     */
    deleteUser: (userId) => axiosInstance.delete(`/user/${ userId }`),

    /**
     * Tải lên ảnh đại diện của người dùng.
     * @param {FormData} formData - Dữ liệu chứa file ảnh.
     * @returns {Promise} Kết quả API trả về.
     */
    uploadAvatar: (formData) =>
        axiosInstance.post('/user/upload-avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
};

export default userApi;
