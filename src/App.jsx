import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./contexts/UserContext";
import Profile from "./pages/Profile"; // Import Profile
import EditProfile from "./pages/EditProfile";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} /> {/* Thêm Profile */}
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
