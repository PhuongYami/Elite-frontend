import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // Import UserContext

const Profile = () => {
    const navigate = useNavigate(); // Hook để chuyển hướng
    const { user } = useUser(); // Lấy dữ liệu người dùng từ UserContext

    return (
        <div className="min-h-screen bg-pink-100 flex flex-col items-center">
            {/* Header */}
            <header className="w-full bg-white shadow-md flex items-center justify-between px-6 py-4">
                <div className="text-2xl font-bold text-pink-600">EliteLusso</div>
                <div className="flex items-center space-x-4">
                    <img
                        src={user.avatar} // Avatar từ dữ liệu
                        alt="Avatar"
                        className="w-10 h-10 rounded-full border-2 border-pink-600"
                    />
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-5xl bg-white shadow-lg rounded-lg p-6 mt-6">
                {/* Header thông tin chính */}
                <section className="flex items-center border-b pb-6 mb-6">
                    {/* Ảnh đại diện chính */}
                    <img
                        src={user.avatar} // Avatar chính
                        alt="Main Avatar"
                        className="w-40 h-40 rounded-lg border-2 border-pink-600"
                    />
                    <div className="ml-6 flex-1">
                        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-sm text-gray-500 mt-2">
                            {user.age} years old - {user.city}
                        </p>
                        <button
                            className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
                            onClick={() => navigate("/edit-profile")} // Chuyển hướng đến Edit Profile
                        >
                            Edit Profile
                        </button>
                    </div>
                </section>

                {/* Thư viện ảnh */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Photo Gallery</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="w-full h-24 bg-gray-200 flex items-center justify-center rounded-md">
                            <span className="text-gray-400">Add Photo</span>
                        </div>
                        <div className="w-full h-24 bg-gray-200 flex items-center justify-center rounded-md">
                            <span className="text-gray-400">Add Photo</span>
                        </div>
                        <div className="w-full h-24 bg-gray-200 flex items-center justify-center rounded-md">
                            <span className="text-gray-400">Add Photo</span>
                        </div>
                    </div>
                </section>

                {/* Thông tin chi tiết */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Details</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500">Goal</h3>
                            <p className="text-gray-800">{user.bio || "Not specified"}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500">Height</h3>
                            <p className="text-gray-800">{user.height} cm</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500">Weight</h3>
                            <p className="text-gray-800">{user.weight} kg</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500">Location</h3>
                            <p className="text-gray-800">{user.city}</p>
                        </div>
                    </div>
                </section>

                {/* Yêu cầu tài chính */}
                <section>
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Financial Requirements</h2>
                    <div className="bg-green-100 p-4 rounded-lg">
                        <p className="text-gray-600">
                            This user prefers partners with financial stability and clear goals. Upgrade to
                            Premium to unlock more details and connect directly.
                        </p>
                        <button
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                        >
                            Get Premium
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Profile;
