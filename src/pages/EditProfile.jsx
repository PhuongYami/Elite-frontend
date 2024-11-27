import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "../contexts/UserContext";

const EditProfile = () => {
    const navigate = useNavigate();
    const { user, updateUser } = useUser(); // Sử dụng updateUser từ context
    const [formData, setFormData] = useState(user);

    const [showPicker, setShowPicker] = useState(false);

    // Danh sách các tùy chọn
    const musicOptions = [
        { value: "shape-of-you", label: "Shape of You - Ed Sheeran" },
        { value: "blinding-lights", label: "Blinding Lights - The Weeknd" },
        { value: "someone-like-you", label: "Someone Like You - Adele" },
        { value: "bohemian-rhapsody", label: "Bohemian Rhapsody - Queen" },
        { value: "havana", label: "Havana - Camila Cabello" },
    ];

    const companyOptions = [
        { value: "fpt", label: "FPT Corporation" },
        { value: "vinamilk", label: "Vinamilk" },
        { value: "viettel", label: "Viettel" },
        { value: "vnpt", label: "VNPT" },
    ];

    const hobbyOptions = [
        { value: "travel", label: "Traveling" },
        { value: "reading", label: "Reading" },
        { value: "cooking", label: "Cooking" },
        { value: "sports", label: "Sports" },
        { value: "gaming", label: "Gaming" },
    ];

    const zodiacOptions = [
        "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
        "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
    ];

    const educationOptions = [
        { value: "vnu-hn", label: "Đại học Quốc gia Hà Nội" },
        { value: "hust", label: "Trường Đại học Bách Khoa Hà Nội" },
        { value: "ftu", label: "Trường Đại học Ngoại Thương" },
        { value: "neu", label: "Trường Đại học Kinh tế Quốc dân" },
    ];

    // Xử lý thay đổi input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Xử lý thay đổi Select
    const handleSelectChange = (name, option) => {
        setFormData({ ...formData, [name]: option });
    };

    // Xử lý chọn Emoji
    const handleEmojiClick = (emojiObject) => {
        setFormData({ ...formData, bio: (formData.bio || "") + emojiObject.emoji });
        setShowPicker(false);
    };

    // Xử lý upload avatar
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({ ...formData, avatar: imageUrl });
        }
    };

    // Xử lý lưu thông tin
    const handleSave = (e) => {
        e.preventDefault();
        updateUser(formData); // Cập nhật dữ liệu vào context
        console.log("Updated Profile Data:", formData); // Log kiểm tra dữ liệu
        alert("Profile updated successfully!");
        navigate("/profile");
    };

    return (
        <div className="min-h-screen bg-pink-100 flex flex-col items-center">
            <header className="w-full bg-white shadow-md flex items-center justify-between px-6 py-4">
                <div className="text-2xl font-bold text-pink-600 cursor-pointer" onClick={() => navigate("/")}>
                    EliteLusso
                </div>
            </header>

            <main className="flex-1 w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 mt-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>
                <form onSubmit={handleSave} className="space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center space-x-4">
                        <img
                            src={formData.avatar}
                            alt="Avatar"
                            className="w-32 h-32 rounded-lg border-2 border-pink-600"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="text-sm text-gray-600"
                        />
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    {/* Age */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    {/* Height */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    {/* Weight */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    {/* Zodiac */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Zodiac Sign</label>
                        <select
                            name="zodiac"
                            value={formData.zodiac}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md"
                        >
                            <option value="">Select Zodiac</option>
                            {zodiacOptions.map((sign) => (
                                <option key={sign} value={sign}>
                                    {sign}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Education */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Education</label>
                        <Select
                            options={educationOptions}
                            value={formData.education}
                            onChange={(option) => handleSelectChange("education", option)}
                            className="mt-1"
                        />
                    </div>

                    {/* Company */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Company</label>
                        <Select
                            options={companyOptions}
                            value={formData.company}
                            onChange={(option) => handleSelectChange("company", option)}
                            className="mt-1"
                        />
                    </div>

                    {/* Position */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Position</label>
                        <input
                            type="text"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            className="mt-1 w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    {/* Hobbies */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hobbies</label>
                        <Select
                            options={hobbyOptions}
                            isMulti
                            value={formData.hobbies}
                            onChange={(option) => handleSelectChange("hobbies", option)}
                            className="mt-1"
                        />
                    </div>

                    {/* Favorite Music */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Favorite Music</label>
                        <Select
                            options={musicOptions}
                            value={formData.favoriteSong}
                            onChange={(option) => handleSelectChange("favoriteSong", option)}
                            className="mt-1"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <div className="relative">
                            <textarea
                                name="bio"
                                value={formData.bio || ""}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Describe yourself..."
                                className="mt-1 w-full px-4 py-2 border rounded-md"
                            ></textarea>
                            <button
                                type="button"
                                onClick={() => setShowPicker(!showPicker)}
                                className="absolute right-4 top-2 text-pink-600"
                            >
                                😀
                            </button>
                            {showPicker && (
                                <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg">
                                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                                </div>
                            )}
                        </div>
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
