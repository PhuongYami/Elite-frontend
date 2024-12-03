import {React, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import OTPVerification from  "./pages/OTPVerification";
import Profile from "./pages/Profile"; // Import Profile
import EditProfile from "./pages/EditProfile";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUser } from './features/auth/authSlice';

const App = () => {
  const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(fetchCurrentUser());
        }
    }, [token, dispatch]);
  return (
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/otp-verification" element={<OTPVerification />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} /> {/* Thêm Profile */}
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
      </Router>
  );
};

export default App;
