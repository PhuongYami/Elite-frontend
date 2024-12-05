import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearError, clearMessage } from "../features/auth/authSlice";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(clearMessage());
    dispatch(forgotPassword({ email }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Quên Mật Khẩu</h1>
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <p className="text-center text-gray-600 mb-6">
          Nhập email của bạn để nhận liên kết đặt lại mật khẩu.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-pink-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-pink-600 text-white py-2 px-4 rounded-md ${
              loading ? "opacity-50" : "hover:bg-pink-700"
            }`}
          >
            {loading ? "Đang gửi..." : "Gửi Liên Kết"}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Nhớ mật khẩu?{" "}
          <a href="/login" className="text-pink-600 hover:underline">
            Đăng Nhập
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
