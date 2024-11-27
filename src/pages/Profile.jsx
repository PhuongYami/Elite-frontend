import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // Import UserContext
import ReactPlayer from "react-player"; // Thư viện phát nhạc
import axios from "axios"; // Gửi yêu cầu đến API

const Profile = () => {
    const navigate = useNavigate(); // Hook để chuyển hướng
    const { user } = useUser(); // Lấy dữ liệu người dùng từ UserContext

    const [favoriteSong, setFavoriteSong] = useState(user.favoriteSong || null); // Bài hát yêu thích

    // Lấy bài hát yêu thích từ API (nếu cần)
    useEffect(() => {
        const fetchFavoriteSong = async () => {
            try {
                const response = await axios.get("/api/user/favorite-song"); // Gửi yêu cầu lấy bài hát
                setFavoriteSong(response.data.song); // Định dạng: { name, artist, url, albumArt }
            } catch (error) {
                console.error("Error fetching favorite song:", error);
            }
        };
        if (!user.favoriteSong) fetchFavoriteSong();
    }, [user.favoriteSong]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-100 via-white to-pink-200 flex flex-col items-center">
            {/* Header */}
            <header className="w-full bg-white shadow-md flex items-center justify-between px-6 py-4">
                <div className="text-3xl font-extrabold text-pink-600">EliteLusso</div>
                <div className="flex items-center space-x-4">
                    <img
                        src={user.avatar} // Avatar từ dữ liệu
                        alt="Avatar"
                        className="w-12 h-12 rounded-full border-2 border-pink-600"
                    />
                    <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-4xl bg-white shadow-lg rounded-lg p-8 mt-6">
                {/* Header thông tin chính */}
                <section className="flex items-center border-b pb-6 mb-6">
                    <img
                        src={user.avatar} // Avatar chính
                        alt="Main Avatar"
                        className="w-32 h-32 rounded-lg border-4 border-pink-600 shadow-lg"
                    />
                    <div className="ml-6 flex-1">
                        <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                        <p className="text-md text-gray-500 mt-2">
                            {user.age} years old - {user.city}
                        </p>
                        <p className="text-gray-700 mt-4 italic">{user.bio || "Bio not available."}</p>
                        <button
                            className="mt-4 bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 shadow"
                            onClick={() => navigate("/edit-profile")}
                        >
                            Edit Profile
                        </button>
                    </div>
                </section>

                {/* Details */}
                <section className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Height</h3>
                        <p className="text-gray-800">{user.height || "Not specified"} cm</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Weight</h3>
                        <p className="text-gray-800">{user.weight || "Not specified"} kg</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Education</h3>
                        <p className="text-gray-800">
                            {user.education ? user.education.label : "Not specified"}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Zodiac Sign</h3>
                        <p className="text-gray-800">{user.zodiac || "Not specified"}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Company</h3>
                        <p className="text-gray-800">
                            {user.company ? user.company.label : "Not specified"}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500">Position</h3>
                        <p className="text-gray-800">{user.position || "Not specified"}</p>
                    </div>
                </section>

                {/* Favorite Music Section */}
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Favorite Music</h2>
                    {favoriteSong ? (
                        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow">
                            {/* Ảnh đại diện bài hát */}
                            <img
                                src={favoriteSong.albumArt || "https://via.placeholder.com/50"}
                                alt={favoriteSong.name}
                                className="w-12 h-12 rounded-lg"
                            />
                            <div className="flex-1">
                                <h3 className="text-gray-800 font-semibold text-md">{favoriteSong.name}</h3>
                                <p className="text-gray-500 text-sm">{favoriteSong.artist}</p>
                            </div>
                            {/* Trình phát nhạc */}
                            <ReactPlayer
                                url={favoriteSong.url}
                                playing={false}
                                controls={true}
                                width="100%"
                                height="50px"
                            />
                        </div>
                    ) : (
                        <p className="text-gray-500">No favorite song selected yet.</p>
                    )}
                </section>

                {/* Financial Requirements */}
                <section>
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Financial Requirements</h2>
                    <div className="bg-green-100 p-4 rounded-lg shadow">
                        <p className="text-gray-600">
                            This user prefers partners with financial stability and clear goals. Upgrade to
                            Premium to unlock more details and connect directly.
                        </p>
                        <button
                            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 shadow"
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
