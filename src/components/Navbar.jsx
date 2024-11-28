import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Lấy trạng thái từ Redux
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap(); // Dispatch action logout
      navigate("/"); // Điều hướng về trang chủ
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="w-full bg-white shadow-md flex items-center px-6 py-4">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-pink-600 cursor-pointer flex-shrink-0"
        onClick={() => navigate("/")}
      >
        EliteLusso
      </div>

      {/* Navigation Links ở giữa */}
      <nav className="flex-1 flex justify-center space-x-8">
        <button
          className="text-gray-700 hover:text-pink-600 font-medium"
          onClick={() => navigate("/discover")}
        >
          Discover
        </button>
        <button
          className="text-gray-700 hover:text-pink-600 font-medium"
          onClick={() => navigate("/messages")}
        >
          Messages
        </button>
        <button
          className="text-gray-700 hover:text-pink-600 font-medium"
          onClick={() => navigate("/activities")}
        >
          Activities
        </button>
        <button
          className="text-gray-700 hover:text-pink-600 font-medium"
          onClick={() => navigate("/search")}
        >
          Search
        </button>
      </nav>

      {/* Kiểm tra trạng thái xác thực */}
      {isAuthenticated ? (
        <div className="flex items-center space-x-4 flex-shrink-0">
          {/* Loading/Error/User Info */}
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error: {error}</p>
          ) : (
            <>
              {/* Avatar và Logout */}
              <img
                src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=150" // Placeholder avatar
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-pink-600"
              />
              <button
                onClick={handleLogout}
                className="text-sm text-pink-600 hover:underline ml-4"
              >
                Logout
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="flex space-x-4 flex-shrink-0">
          <button
            className="text-gray-700 hover:text-pink-600"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </button>
          <button
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
            onClick={() => navigate("/register")}
          >
            Đăng ký
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
