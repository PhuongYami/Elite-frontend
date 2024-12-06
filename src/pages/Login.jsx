import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError, clearMessage } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLoginButton';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth); // Lấy từ authSlice

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Xóa lỗi và thông báo khi trang được tải
  useEffect(() => {
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/dashboard');
      }
    });
  };

  // Điều hướng đến trang Quên mật khẩu
  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Đăng nhập</h1>
        {error && <div className="text-red-600 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-pink-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-pink-600 text-white py-2 px-4 rounded-md ${loading ? 'opacity-50' : 'hover:bg-pink-700'}`}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleForgotPassword}
            className="text-pink-600 hover:underline focus:outline-none"
          >
            Quên mật khẩu?
          </button>
          <p className="text-center text-gray-600 mb-2">Hoặc</p>
          <GoogleLoginButton /> {/* Thêm nút GoogleLoginButton */}
        </div>
      </div>
    </div>
  );
};

export default Login;
