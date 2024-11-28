import React from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
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
