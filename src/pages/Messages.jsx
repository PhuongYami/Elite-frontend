import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react"; // Import Emoji Picker

const Messages = () => {
    const [messages, setMessages] = useState([]); // State quản lý danh sách tin nhắn
    const [newMessage, setNewMessage] = useState(""); // State quản lý nội dung tin nhắn mới
    const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Hiển thị Emoji Picker

    // Hàm gửi tin nhắn
    const handleSendMessage = () => {
        if (!newMessage.trim()) return; // Không gửi tin nhắn rỗng
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: "text", content: newMessage, timestamp: new Date() },
        ]);
        setNewMessage(""); // Reset input sau khi gửi
    };

    // Hàm chọn emoji
    const handleEmojiClick = (emojiObject) => {
        setNewMessage((prev) => prev + emojiObject.emoji); // Thêm emoji vào nội dung tin nhắn
    };

    // Hàm gửi ảnh
    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: "image", content: imageUrl, timestamp: new Date() },
            ]);
        }
    };

    // Hàm gửi audio
    const handleUploadAudio = (e) => {
        const file = e.target.files[0];
        if (file) {
            const audioUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho audio
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: "audio", content: audioUrl, timestamp: new Date() },
            ]);
        }
    };

    return (
        <div className="min-h-screen bg-pink-100 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-md flex items-center justify-between px-6 py-4">
                <h1 className="text-2xl font-bold text-pink-600">Messages</h1>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 bg-pink-50 overflow-y-auto">
                {/* Hiển thị danh sách tin nhắn */}
                <div className="space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg ${message.type === "text"
                                    ? "bg-white"
                                    : message.type === "image"
                                        ? "bg-gray-100"
                                        : "bg-green-100"
                                }`}
                        >
                            {message.type === "text" && (
                                <p className="text-gray-800">{message.content}</p>
                            )}
                            {message.type === "image" && (
                                <img
                                    src={message.content}
                                    alt="Uploaded"
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                            )}
                            {message.type === "audio" && (
                                <audio controls>
                                    <source src={message.content} type="audio/mpeg" />
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                            <span className="text-xs text-gray-500 block mt-2">
                                {message.timestamp.toLocaleTimeString()}
                            </span>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer (Input và các hành động) */}
            <footer className="bg-white shadow-md p-4 flex items-center space-x-4">
                {/* Emoji Picker */}
                <button
                    className="text-pink-600 hover:text-pink-800"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    😀
                </button>
                {showEmojiPicker && (
                    <div className="absolute bottom-20 left-4 z-50 bg-white border rounded-lg shadow-lg">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}

                {/* Input để gửi tin nhắn */}
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-500"
                />

                {/* Nút gửi tin nhắn */}
                <button
                    onClick={handleSendMessage}
                    className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
                >
                    Send
                </button>

                {/* Nút tải ảnh */}
                <label className="cursor-pointer text-pink-600 hover:text-pink-800">
                    📷
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUploadImage}
                        className="hidden"
                    />
                </label>

                {/* Nút tải audio */}
                <label className="cursor-pointer text-pink-600 hover:text-pink-800">
                    🎵
                    <input
                        type="file"
                        accept="audio/*"
                        onChange={handleUploadAudio}
                        className="hidden"
                    />
                </label>
            </footer>
        </div>
    );
};

export default Messages;
