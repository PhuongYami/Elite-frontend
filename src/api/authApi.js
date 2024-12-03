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
     * @param {Object} data - Dữ liệu đăng ký.
     * @returns {Promise} Kết quả API trả về.
     */
    register: (data) => axiosInstance.post('/auth/register', data),

    /**
     * Kiểm tra token của người dùng.
     * @returns {Promise} Kết quả API trả về.
     */
    refreshToken: () => axiosInstance.post('/auth/refresh-token'),

    /**
     * Đăng xuất người dùng.
     * @returns {Promise} Kết quả API trả về.
     */
    logout: () => axiosInstance.post('/auth/logout'),

    /**
     * Gửi email khôi phục mật khẩu.
     * @param {Object} data - Email người dùng ({ email }).
     * @returns {Promise} Kết quả API trả về.
     */
    forgotPassword: (data) => axiosInstance.post('/auth/forgot-password', data),

    /**
     * Đặt lại mật khẩu qua link.
     * @param {Object} data - Dữ liệu đổi mật khẩu ({ resetToken, newPassword }).
     * @returns {Promise} Kết quả API trả về.
     */
    resetPassword: (resetToken, data) => axiosInstance.post(`/auth/reset-password/${ resetToken }`, data),

    /**
     * Đặt lại mật khẩu qua OTP trên điện thoại.
     * @param {Object} data - Số điện thoại và OTP ({ phone, otp, newPassword }).
     * @returns {Promise} Kết quả API trả về.
     */
    resetPasswordByPhone: (data) => axiosInstance.post('/auth/send-password-reset-otp', data),

    /**
     * Gửi mã OTP tới email hoặc số điện thoại.
     * @param {Object} data - Dữ liệu gửi OTP ({ email hoặc phone }).
     * @returns {Promise} Kết quả API trả về.
     */
    sendOTP: (data) => axiosInstance.post('/auth/send-otp', data),

    /**
     * Xác thực mã OTP.
     * @param {Object} data - Dữ liệu xác thực OTP ({ email hoặc phone, otp }).
     * @returns {Promise} Kết quả API trả về.
     */
    verifyOTP: (data) => axiosInstance.post('/auth/verify-phone', data),

    /**
     * Xác thực email của người dùng.
     * @param {Object} data - Mã xác thực OTP và email.
     * @returns {Promise} Kết quả API trả về.
     */
    verifyEmail: (data) => axiosInstance.post('/auth/verify-email', data),

    /**
     * Lấy thông tin người dùng hiện tại.
     * @returns {Promise} Kết quả API trả về.
     */
    getMe: () => axiosInstance.get('/auth/me'),
};

export default authApi;
