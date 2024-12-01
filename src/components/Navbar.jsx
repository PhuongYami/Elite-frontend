import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../components/Logo";
import NavigationLinks from "../components/NavigationLinks";
import UserSection from "../components/UserSection";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Logo onClick={() => navigate("/")} />

      {/* Hamburger Menu for Mobile */}
      <button
        className="block md:hidden text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Navigation Links */}
      <div
        className={`absolute top-16 left-0 w-full bg-white md:relative md:top-0 md:flex-1 md:flex md:justify-center ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {isAuthenticated ? (
          <NavigationLinks
            links={[
              { label: "Discover", action: () => navigate("/discover") },
              { label: "Messages", action: () => navigate("/messages") },
              { label: "Activities", action: () => navigate("/activities") },
              { label: "Search", action: () => navigate("/search") },
            ]}
          />
        ) : (
          <div className="md:hidden"></div>
        )}
      </div>

      {/* User Section */}
      <div className="flex-shrink-0">
        <UserSection
          isAuthenticated={isAuthenticated}
          loading={loading}
          error={error}
          onLogout={handleLogout}
          onLogin={() => navigate("/login")}
          onRegister={() => navigate("/register")}
        />
      </div>
    </header>
  );
};

export default Navbar;
