import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");

    // Logic kiểm tra thông tin đăng nhập (thay bằng API thực)
    //   if (email === "admin@admin.com" && password === "password") {
    //     // Điều hướng đến Dashboard
    //     navigate("/dashboard");
    //   } else {
    //     alert("Sai thông tin đăng nhập, vui lòng thử lại.");
    //   }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Đăng nhập</h1>
        <form onSubmit={handleLogin} className="mt-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Nhập email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Nhập mật khẩu"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700"
          >
            Đăng nhập
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Chưa có tài khoản?{" "}
          <a href="/register" className="text-pink-600 hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
