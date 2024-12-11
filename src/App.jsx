import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { refreshAccessToken, fetchCurrentUser } from "./features/auth/authSlice";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover/Discover";
import Messages from "./pages/Messages";
import Activities from "./pages/Activities";
import Search from "./pages/AdvancedSearch/Search";
import OTPVerification from "./pages/OTPVerification";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import GoogleCallbackHandler from "./components/GoogleCallbackHandler"; 
import AccountInfo from "./pages/AccountInfo";


const App = () => {
  const dispatch = useDispatch();
  const [isAuthInitialized, setIsAuthInitialized] = useState(false); // Trạng thái khởi tạo xác thực

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const path = window.location.pathname;

        // Chỉ làm mới token nếu không ở trang đăng nhập hoặc đăng ký
        if (!['/login', '/register'].includes(path)) {
          await dispatch(refreshAccessToken()).unwrap();
          await dispatch(fetchCurrentUser()).unwrap();
        }
      } catch (error) {
        console.error("Failed to initialize authentication:", error);
      } finally {
        setIsAuthInitialized(true); // Đánh dấu khởi tạo xác thực hoàn tất
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (!isAuthInitialized) {
    // Hiển thị màn hình loading trong khi khởi tạo xác thực
    return <div>Loading...</div>;
  }

  return (
<>
<ToastContainer position="top-right" autoClose={3000} />
<Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/google-callback/:token" element={<GoogleCallbackHandler />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/discover"
          element={
            <ProtectedRoute>
              <Discover />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activities"
          element={
            <ProtectedRoute>
              <Activities />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account-settings"
          element={
            <ProtectedRoute>
              <AccountInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
      
    </Router>
</>
    
  );
};

export default App;
