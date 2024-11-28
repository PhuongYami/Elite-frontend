import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../features/user/userSlice"; // Import fetchCurrentUser action
import { logoutUser } from "../features/auth/authSlice"; // Import logout action

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access data from Redux Store
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Fetch user information on component render
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      dispatch(fetchCurrentUser()); // Fetch user data
    }
  }, [isAuthenticated, dispatch, navigate]);

  // Handle logout
  const handleLogout = async () => {
    try {
        await dispatch(logoutUser()).unwrap(); // Dispatch logout thunk
        navigate('/login'); // Redirect to login page
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="w-full bg-white shadow-md flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-pink-600">EliteLusso</div>

        {/* Navigation Links */}
        <nav className="flex space-x-8">
          <button className="text-gray-700 hover:text-pink-600 font-medium">Discover</button>
          <button className="text-gray-700 hover:text-pink-600 font-medium">Messages</button>
          <button className="text-gray-700 hover:text-pink-600 font-medium">Activities</button>
          <button className="text-gray-700 hover:text-pink-600 font-medium">Search</button>
        </nav>

        {/* User Avatar and Info */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-sm text-red-500">Error: {error}</p>
          ) : (
            <>
              <img
                src={userInfo?.profile?.avatar || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-pink-600"
              />
              <div>
                <p className="text-sm font-semibold text-gray-800">{userInfo?.username || "Guest"}</p>
                <p className="text-xs text-gray-500">{userInfo?.account_type || "Basic Member"}</p>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-pink-600 hover:underline ml-4"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-50">
          <h1 className="text-xl font-bold text-gray-800 mb-4">Discover</h1>
          <div className="bg-white rounded-lg shadow-md p-4 space-y-6">
            {/* Profile Card 1 */}
            <div className="flex items-start">
              <img
                src="https://i.pinimg.com/474x/eb/51/85/eb51850b3222122bde1ff1f01e5bfad7.jpg"
                alt="Profile"
                className="w-32 h-32 rounded-lg"
              />
              <div className="ml-6">
                <h2 className="text-xl font-bold text-gray-800">Shan, 25</h2>
                <p className="text-sm text-gray-500 mt-2">73% Match</p>
                <button
                  className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
                  onClick={() => navigate("/profile/1")}
                >
                  View Profile
                </button>
              </div>
            </div>

            {/* Profile Card 2 */}
            <div className="flex items-start">
              <img
                src="https://i.pinimg.com/474x/d9/9d/ae/d99dae7075ca8e6e17e4c515b8bd1dce.jpg"
                alt="Profile"
                className="w-32 h-32 rounded-lg"
              />
              <div className="ml-6">
                <h2 className="text-xl font-bold text-gray-800">Shin, 28</h2>
                <p className="text-sm text-gray-500 mt-2">53% Match</p>
                <button
                  className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
                  onClick={() => navigate("/profile/2")}
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-1/4 bg-white shadow-md p-4">
          <div className="bg-green-100 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-green-600">Get Premium</h2>
            <p className="text-sm text-gray-600 mt-2">
              Unlock all features, view private photos, and connect without limits!
            </p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Upgrade to Premium
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
