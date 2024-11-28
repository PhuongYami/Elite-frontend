import axiosInstance from '../utils/axiosInstance';

const authApi = {
    /**
     * Đăng nhập người dùng.
     * @param {Object} data - Dữ liệu đăng nhập ({ email, password }).
     * @returns {Promise} Kết quả API trả về.
     */
    login: (data) => axiosInstance.post('/auth/login', data),

    /**
     * Đăng ký người dùng mới.
     * @param {Object} data - Dữ liệu đăng ký ({ name, email, password }).
     * @returns {Promise} Kết quả API trả về.
     */
    register: (data) => axiosInstance.post('/auth/register', data),

    /**
     * Kiểm tra token của người dùng.
     * @returns {Promise} Kết quả API trả về.
     */
    verifyToken: () => axiosInstance.get('/auth/verify-token'),

    /**
     * Đăng xuất người dùng.
     * @returns {Promise} Kết quả API trả về.
     */
    logout: () => axiosInstance.post('/auth/logout'),

    /**
     * Quên mật khẩu - gửi email khôi phục.
     * @param {Object} data - Email người dùng ({ email }).
     * @returns {Promise} Kết quả API trả về.
     */
    forgotPassword: (data) => axiosInstance.post('/auth/forgot-password', data),

    /**
     * Reset mật khẩu.
     * @param {Object} data - Dữ liệu đổi mật khẩu ({ token, newPassword }).
     * @returns {Promise} Kết quả API trả về.
     */
    resetPassword: (data) => axiosInstance.post('/auth/reset-password', data),
};

export default authApi;
