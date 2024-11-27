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
        bio: "Energetic and outgoing.",
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Hook để sử dụng dữ liệu từ Context
export const useUser = () => useContext(UserContext);
