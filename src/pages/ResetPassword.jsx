import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearError, clearMessage } from "../features/auth/authSlice";

const ResetPassword = () => {
  const { resetToken } = useParams(); // Lấy token từ URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Xóa lỗi và thông báo khi trang được tải
  useEffect(() => {
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(resetPassword({ resetToken, password, confirmPassword }))
      .unwrap()
      .then(() => {
        alert("Đặt lại mật khẩu thành công!");
        navigate("/login");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold  text-gray-800 text-center mb-4">
          Đặt Lại Mật Khẩu
        </h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        <p className="text-center text-gray-600 mb-6">
          Nhập mật khẩu mới của bạn bên dưới.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-pink-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-pink-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-pink-600 text-white py-2 px-4 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-700"
            }`}
          >
            {loading ? "Đang xử lý..." : "Đặt Lại Mật Khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
