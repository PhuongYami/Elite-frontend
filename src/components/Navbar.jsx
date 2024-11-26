import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-10">
      <div className="flex justify-between items-center px-6 py-4">
        <h1
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          EliteLusso
        </h1>
        <div className="flex space-x-4">
          <button
            className="text-gray-700 hover:text-blue-600"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => navigate("/register")}
          >
            Đăng ký
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
