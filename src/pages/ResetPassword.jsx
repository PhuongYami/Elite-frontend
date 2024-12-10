import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearError, clearMessage } from "../features/auth/authSlice";

const ResetPassword = () => {
  const { resetToken } = useParams(); // Get token from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearMessage());
  }, [dispatch]);

  // Validate password complexity
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      alert("Please enter a valid password.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password confirmation does not match.");
      return;
    }

    dispatch(resetPassword({ resetToken, password, confirmPassword }))
      .unwrap()
      .then(() => {
        alert("Password reset successfully!");
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
          Reset Password
        </h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        {message && <p className="text-green-600 text-center mb-4">{message}</p>}
        <p className="text-center text-gray-600 mb-6">
          Enter your new password below.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-pink-500"
            />
            {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
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
            disabled={loading || passwordError}
            className={`w-full bg-pink-600 text-white py-2 px-4 rounded-md ${
              loading || passwordError ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-700"
            }`}
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
