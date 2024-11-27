import React, { createContext, useState, useContext } from "react";

// Tạo Context
const UserContext = createContext();

// Provider để quản lý dữ liệu người dùng
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        avatar: "https://via.placeholder.com/150",
        name: "John Doe",
        age: 24,
        city: "Ho Chi Minh City",
        height: 170,
        weight: 70,
        education: { value: "vnu-hn", label: "Đại học Quốc gia Hà Nội" },
        company: { value: "fpt", label: "FPT Corporation" },
        position: "Software Engineer",
        zodiac: "Gemini",
        hobbies: [
            { value: "reading", label: "Reading" },
            { value: "travel", label: "Traveling" },
        ],
        bio: "Energetic and outgoing.",
        favoriteSong: null, // Mặc định chưa có bài hát yêu thích
    });

    const updateUser = (updatedFields) => {
        setUser((prevUser) => {
            const updatedUser = { ...prevUser, ...updatedFields };
            console.log("Updated User:", updatedUser); // Log kiểm tra dữ liệu
            return updatedUser;
        });
    };

    return (
        <UserContext.Provider value={{ user, setUser, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook để sử dụng dữ liệu từ Context
export const useUser = () => useContext(UserContext);
