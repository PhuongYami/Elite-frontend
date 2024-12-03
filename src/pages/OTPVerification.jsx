import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail, sendOTP, setAuth } from '../features/auth/authSlice'; // Import các hành động từ authSlice

const OTPVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy email từ state được chuyển từ trang đăng ký
  const email = location.state?.email || '';

  const { loading, error } = useSelector((state) => state.auth); // Lấy trạng thái loading và error từ Redux

  const [otpCode, setOtp] = useState('');
  const [resendLoading, setResendLoading] = useState(false);

  const handleInputChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpCode) {
      alert('Vui lòng nhập mã OTP');
      return;
    }

    try {
      const result = await dispatch(verifyEmail({ email, otpCode })).unwrap();
      console.log('OTP verification successful:', result);
      alert('Xác thực thành công!');
      const { user, token } = result;
      dispatch(setAuth({ user, token }));
      navigate('/dashboard'); // Điều hướng tới trang chính sau khi xác thực thành công
    } catch (err) {
      console.error('OTP verification failed:', err);
      alert(err.message || 'Xác thực OTP thất bại');
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      const result = await dispatch(sendOTP({ email })).unwrap();
      console.log('Resent OTP successfully:', result);
      alert('Mã OTP mới đã được gửi!');
    } catch (err) {
      console.error('Resend OTP failed:', err);
      alert(err.message || 'Gửi lại mã OTP thất bại');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Xác Thực OTP</h2>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        <p className="text-center text-gray-600 mb-4">
          Một mã OTP đã được gửi đến email <span className="font-semibold">{email}</span>. Vui lòng nhập mã để xác thực.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="otp"
            value={otpCode}
            onChange={handleInputChange}
            placeholder="Nhập mã OTP"
            required
            maxLength={6}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Đang xử lý...' : 'Xác Thực'}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Không nhận được mã?{' '}
          <button
            onClick={handleResendOTP}
            disabled={resendLoading}
            className="text-blue-500 hover:underline"
          >
            {resendLoading ? 'Đang gửi lại...' : 'Gửi lại mã'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
