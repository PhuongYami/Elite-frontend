import React from "react";

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-pink-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[100vh]">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Đăng ký</h1>
        <form className="mt-6 space-y-3">
          {/* Họ và tên */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Nhập họ và tên"
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              type="tel"
              id="phone"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Nhập số điện thoại"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Nhập email"
            />
          </div>

          {/* Quốc tịch */}
          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
              Quốc tịch
            </label>
            <select
              id="nationality"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">Chọn quốc tịch</option>
              <option value="vietnam">Việt Nam</option>
              <option value="usa">Mỹ</option>
              <option value="uk">Anh</option>
              <option value="france">Pháp</option>
              <option value="other">Khác</option>
            </select>
          </div>

          {/* Giới tính */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Giới tính
            </label>
            <div className="mt-2 flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="h-4 w-4 text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2 text-gray-700">Nữ</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="h-4 w-4 text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2 text-gray-700">Nam</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  className="h-4 w-4 text-pink-500 focus:ring-pink-500"
                />
                <span className="ml-2 text-gray-700">Khác</span>
              </label>
            </div>
          </div>

          {/* Mật khẩu */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Nhập mật khẩu"
            />
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Xác nhận mật khẩu"
            />
          </div>

          {/* Nút đăng ký */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:ring-2 focus:ring-pink-500"
          >
            Đăng ký
          </button>
        </form>

        {/* Điều hướng đến đăng nhập */}
        <p className="mt-4 text-sm text-center text-gray-600">
          Đã có tài khoản?{" "}
          <a href="/login" className="text-pink-600 hover:underline">
            Đăng nhập
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
