import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { refreshAccessToken, fetchCurrentUser } from "./features/auth/authSlice";
import Navbar from "./components/Navbar";
import allRoutes from "./routes";

const App = () => {
  const dispatch = useDispatch();
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const path = window.location.pathname;

        if (!["/login", "/register", "/reset-password"].includes(path)) {
          await dispatch(refreshAccessToken()).unwrap();
          await dispatch(fetchCurrentUser()).unwrap();
        }
      } catch (error) {
        console.error("Failed to initialize authentication:", error);
      } finally {
        setIsAuthInitialized(true);
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (!isAuthInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Navbar />
        <Routes>
          {allRoutes.map(({ path, element }, index) => (
            <Route key={index} path={path} element={element} />
          ))}
        </Routes>
      </Router>
    </>
  );
};

export default App;
