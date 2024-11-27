import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useUser } from "../contexts/UserContext";

const EditProfile = () => {
    const navigate = useNavigate();
    const { user, setUser } = useUser(); // Lấy dữ liệu từ UserContext

    // State tạm thời để chỉnh sửa
    const [profile, setProfile] = useState(user);

    // Danh sách các trường đại học lớn tại Việt Nam
    const universityOptions = [
        { value: "vnu-hn", label: "Đại học Quốc gia Hà Nội" },
        { value: "hust", label: "Trường Đại học Bách Khoa Hà Nội" },
        { value: "ftu", label: "Trường Đại học Ngoại Thương" },
        { value: "neu", label: "Trường Đại học Kinh tế Quốc dân" },
        { value: "vnu-hcm", label: "Đại học Quốc gia TP. Hồ Chí Minh" },
        { value: "uit", label: "Trường Đại học Công nghệ Thông tin (UIT)" },
        { value: "uel", label: "Trường Đại học Kinh tế - Luật (UEL)" },
        { value: "hus", label: "Trường Đại học Khoa học Tự nhiên - ĐHQGHN" },
        { value: "ussh", label: "Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN" },
        { value: "rmit", label: "RMIT University Vietnam" },
        { value: "tonduc", label: "Trường Đại học Tôn Đức Thắng" },
        { value: "ueh", label: "Trường Đại học Kinh tế TP. Hồ Chí Minh" },
        { value: "saigon", label: "Trường Đại học Sài Gòn" },
        { value: "huflit", label: "Trường Đại học Ngoại ngữ - Tin học TP. Hồ Chí Minh (HUFLIT)" },
        { value: "hcmute", label: "Trường Đại học Sư phạm Kỹ thuật TP. Hồ Chí Minh" },
        { value: "hcmus", label: "Trường Đại học Khoa học Tự nhiên - ĐHQG TP. Hồ Chí Minh" },
        { value: "cantho", label: "Trường Đại học Cần Thơ" },
        { value: "hue", label: "Đại học Huế" },
        { value: "danang", label: "Đại học Đà Nẵng" },
        { value: "vinh", label: "Trường Đại học Vinh" },
        { value: "thuyloi", label: "Trường Đại học Thủy lợi" },
        { value: "luathanoi", label: "Trường Đại học Luật Hà Nội" },
        { value: "xaydung", label: "Trường Đại học Xây dựng Hà Nội" },
        { value: "bachkhoahcm", label: "Trường Đại học Bách Khoa TP. Hồ Chí Minh" },
        { value: "ydhn", label: "Trường Đại học Y Hà Nội" },
        { value: "ydtphcm", label: "Trường Đại học Y Dược TP. Hồ Chí Minh" },
        { value: "quynhon", label: "Trường Đại học Quy Nhơn" },
        { value: "dulich", label: "Trường Đại học Văn hóa - Du lịch TP. Hồ Chí Minh" },
    ];

    // Xử lý upload avatar
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfile((prev) => ({ ...prev, avatar: imageUrl }));
        }
    };

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // Xử lý thay đổi trường đại học
    const handleEducationChange = (option) => {
        setProfile({ ...profile, education: option });
    };

    // Xử lý lưu thông tin
    const handleSave = (e) => {
        e.preventDefault();
        setUser(profile); // Cập nhật dữ liệu toàn cục
        alert("Profile updated successfully!");
        navigate("/profile"); // Chuyển hướng về trang Profile
    };

    return (
        <div className="min-h-screen bg-pink-100 flex flex-col items-center">
            <header className="w-full bg-white shadow-md flex items-center justify-between px-6 py-4">
                <div className="text-2xl font-bold text-pink-600 cursor-pointer" onClick={() => navigate("/")}>
                    EliteLusso
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>
                <form onSubmit={handleSave} className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-4">
                        <img
                            src={profile.avatar}
                            alt="Avatar"
                            className="w-32 h-32 rounded-lg border-2 border-pink-600"
                        />
                        <div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="text-sm text-gray-600"
                            />
                            <p className="text-xs text-gray-500 mt-1">Upload from your computer</p>
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={profile.age}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                            type="text"
                            name="city"
                            value={profile.city}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    {/* Height */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={profile.height}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    {/* Weight */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={profile.weight}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pink-500"
                        />
                    </div>

                    {/* Education */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Education</label>
                        <Select
                            options={universityOptions}
                            value={profile.education}
                            onChange={(option) => setProfile({ ...profile, education: option })}
                            className="mt-1"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            name="bio"
                            value={profile.bio}
                            onChange={handleChange}
                            rows="4"
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-pink-500"
                        ></textarea>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
                            onClick={() => navigate("/profile")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default EditProfile;