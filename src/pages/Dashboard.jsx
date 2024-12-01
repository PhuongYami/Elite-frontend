import React from "react";
import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/ProfileCard";

const Dashboard = () => {
  const profiles = [
    { id: 1, name: "Shan", age: 25, match: 73, imgUrl: "https://i.pinimg.com/474x/eb/51/85/eb51850b3222122bde1ff1f01e5bfad7.jpg" },
    { id: 2, name: "Shin", age: 28, match: 53, imgUrl: "https://i.pinimg.com/474x/d9/9d/ae/d99dae7075ca8e6e17e4c515b8bd1dce.jpg" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      <main className="flex-1 p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-6">Discover</h1>
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          {profiles.map(profile => (
            <ProfileCard key={profile.id} {...profile} />
          ))}
        </div>
      </main>
      <Sidebar />
    </div>
  );
};

export default Dashboard;
