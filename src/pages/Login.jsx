import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError, clearMessage } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import GoogleLoginButton from '../components/GoogleLoginButton';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo or Header */}
        <h1 className="text-3xl font-light text-neutral-800 text-center mb-8">Welcome Back</h1>

        {/* Error Notification */}
        {error && (
          <div className="text-red-600 bg-red-50 border border-red-300 rounded-lg p-4 mb-6 text-center">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-neutral-700 block mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-10 py-3 border rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500"
              />
              <Mail className="absolute left-3 top-3 text-neutral-400" size={18} />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="text-sm font-medium text-neutral-700 block mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-10 py-3 border rounded-lg shadow-sm focus:ring-pink-500 focus:border-pink-500"
              />
              <Lock className="absolute left-3 top-3 text-neutral-400" size={18} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium text-white ${
              loading
                ? 'bg-pink-400 cursor-not-allowed'
                : 'bg-pink-600 hover:bg-pink-700 transition'
            }`}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <button
            onClick={handleForgotPassword}
            className="text-pink-600 hover:underline focus:outline-none"
          >
            Forgot password?
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-neutral-200" />
          <span className="px-4 text-sm text-neutral-500">OR</span>
          <hr className="flex-1 border-neutral-200" />
        </div>

        {/* Social Login */}
        <div className="mt-4 text-center">
          
          <p className="text-center text-gray-600 mb-2">Hoặc</p>
          <GoogleLoginButton /> {/* Thêm nút GoogleLoginButton */}
        </div>

        {/* Register Redirect */}
        <p className="text-center text-sm text-neutral-600 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-pink-600 hover:underline font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
