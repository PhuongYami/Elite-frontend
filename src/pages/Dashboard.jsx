import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmojiPicker from "emoji-picker-react"; // Import thư viện emoji-picker-react

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("discover");
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [currentChatUserId, setCurrentChatUserId] = useState(null);
    const [filteredDiscoverUsers, setFilteredDiscoverUsers] = useState([]);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const [posts, setPosts] = useState([
        {
            id: 1,
            user: { name: "Shan", avatar: "https://i.pinimg.com/474x/eb/51/85/eb51850b3222122bde1ff1f01e5bfad7.jpg" },
            content: "Enjoying a beautiful day at the park! 🌞",
            media: "https://i.pinimg.com/originals/4d/e7/1a/4de71ad02a4db81435e1b8eb22a9d5ad.jpg",
            likes: 5,
            liked: false,
            comments: [],
        },
        {
            id: 2,
            user: { name: "Shin", avatar: "https://i.pinimg.com/474x/d9/9d/ae/d99dae7075ca8e6e17e4c515b8bd1dce.jpg" },
            content: "Had an amazing dinner with friends 🍝🍷",
            media: "https://i.pinimg.com/originals/3a/e3/63/3ae363b8d3d408890b643ec87f1cfa80.jpg",
            likes: 10,
            liked: true,
            comments: [],
        },
    ]);
    const handleEmojiClick = (emojiObject) => {
        setMessageInput((prev) => prev + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const [searchFilters, setSearchFilters] = useState({
        name: "",
        distance: "",
        hobby: "",
    });
    const [filteredUsers, setFilteredUsers] = useState([]);

    // Dữ liệu giả lập người dùng
    const users = [
        { id: 1, name: "Shan", age: 25, zodiac: "Gemini", education: "Bachelor's", hobbies: ["Reading", "Travel"], compatibility: 85, avatar: "https://i.pinimg.com/474x/eb/51/85/eb51850b3222122bde1ff1f01e5bfad7.jpg" },
        { id: 2, name: "Shin", age: 28, zodiac: "Cancer", education: "Master's", hobbies: ["Cooking", "Travel"], compatibility: 60, avatar: "https://i.pinimg.com/474x/d9/9d/ae/d99dae7075ca8e6e17e4c515b8bd1dce.jpg" },
        { id: 3, name: "Alice", age: 30, zodiac: "Leo", education: "Bachelor's", hobbies: ["Photography"], compatibility: 73, avatar: "https://i.pinimg.com/474x/cd/44/49/cd44495163f8a630492e9db047ac708a.jpg" },
        { id: 4, name: "Bob", age: 27, zodiac: "Virgo", education: "Doctorate", hobbies: ["Travel", "Music"], compatibility: 50, avatar: "https://i.pinimg.com/474x/b2/29/6a/b2296ab60fc180b52e9e1754f8d7e0b3.jpg" },
        { id: 5, name: "May", age: 24, zodiac: "Gemini", education: "Bachelor's", hobbies: ["Reading", "Travel"], compatibility: 95, avatar: "https://i.pinimg.com/474x/70/ff/f6/70fff6ce8fe3fc0c0ff3278774c78da9.jpg" },
        { id: 6, name: "Hola", age: 30, zodiac: "Cancer", education: "Master's", hobbies: ["Cooking", "Travel"], compatibility: 64, avatar: "https://i.pinimg.com/474x/0e/c6/30/0ec6307ad8632713a8cdb0c921912c5c.jpg" },
        { id: 7, name: "Vuy", age: 29, zodiac: "Leo", education: "Bachelor's", hobbies: ["Photography"], compatibility: 79, avatar: "https://i.pinimg.com/474x/b1/87/3b/b1873b0b2738922f83eea8bc754afa68.jpg" },
        { id: 8, name: "Tera", age: 26, zodiac: "Virgo", education: "Doctorate", hobbies: ["Travel", "Music"], compatibility: 52, avatar: "https://i.pinimg.com/736x/44/7e/83/447e83c66162c1e820215cfabab95ec8.jpg" },

    ];

    // Lọc Discover
    const handleDiscoverFilter = () => {
        const filtered = users.filter((user) => user.compatibility >= 50);
        setFilteredDiscoverUsers(filtered);
    };

    // Xử lý bộ lọc tìm kiếm
    const handleSearch = () => {
        const { name, distance, hobby } = searchFilters;
        const filtered = users.filter((user) => {
            const matchesName = name === "" || user.name.toLowerCase().includes(name.toLowerCase());
            const matchesDistance = distance === "" || user.distance <= parseInt(distance);
            const matchesHobby = hobby === "" || user.hobbies.includes(hobby);
            return matchesName && matchesDistance && matchesHobby;
        });
        setFilteredUsers(filtered);
    };




    const [stories] = useState([
        {
            id: 1,
            user: { name: "Alice", avatar: "https://i.pinimg.com/474x/f8/1e/3f/f81e3fa14b26e20924a4c8e2f91aa9e5.jpg" },
            media: "https://i.pinimg.com/originals/78/3c/82/783c82b9f84a44cf307d3428f3b3dcad.jpg",
        },
        {
            id: 2,
            user: { name: "Bob", avatar: "https://i.pinimg.com/474x/16/6b/4e/166b4e6e6a3174bcd39fd5e04d25a98a.jpg" },
            media: "https://i.pinimg.com/originals/6b/e4/3f/6be43fb567840a1eb8d9e64779fa9021.jpg",
        },
    ]);



    const currentChatUser = users.find((user) => user.id === currentChatUserId);

    // Gửi tin nhắn
    const handleSendMessage = () => {
        if (messageInput.trim() !== "" || selectedFile) {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now(),
                    text: messageInput,
                    media: selectedFile ? URL.createObjectURL(selectedFile) : null,
                    sender: "me",
                    timestamp: new Date().toLocaleTimeString(),
                    status: "Sent",
                },
            ]);
            setMessageInput("");
            setSelectedFile(null);
            setShowEmojiPicker(false);
        }
    };

    // Thả/Thay đổi trạng thái Like
    function toggleLike(postId) {
        setPosts((prevPosts) => prevPosts.map((post) => post.id === postId
            ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
            : post
        )
        );
    }

    const addComment = (postId, comment) => {
        if (!comment.trim()) return;
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? { ...post, comments: [...post.comments, { id: Date.now(), text: comment }] }
                    : post
            )
        );
    };

    return (
        <div className="min-h-screen flex flex-col bg-pink-100">
            {/* Top Navigation Bar */}
            <header className="w-full bg-white shadow-md flex items-center justify-between px-6 py-4">
                <div className="text-2xl font-bold text-pink-600">EliteLusso</div>
                <nav className="flex space-x-8">
                    <button
                        className={`text-gray-700 hover:text-pink-600 font-medium ${activeTab === "discover" ? "text-pink-600 font-bold" : ""}`}
                        onClick={() => {
                            setActiveTab("discover");
                            handleDiscoverFilter();
                        }}
                    >
                        Discover
                    </button>
                    <button
                        className={`text-gray-700 hover:text-pink-600 font-medium ${activeTab === "messages" ? "text-pink-600 font-bold" : ""
                            }`}
                        onClick={() => {
                            if (activeTab === "messages" && currentChatUserId) {
                                setCurrentChatUserId(null);
                            } else {
                                setActiveTab("messages");
                            }
                        }}
                    >
                        Messages
                    </button>
                    <button
                        className={`text-gray-700 hover:text-pink-600 font-medium ${activeTab === "activities" ? "text-pink-600 font-bold" : ""
                            }`}
                        onClick={() => setActiveTab("activities")}
                    >
                        Activities
                    </button>
                    <button
                        className={`text-gray-700 hover:text-pink-600 font-medium ${activeTab === "search" ? "text-pink-600 font-bold" : ""
                            }`}
                        onClick={() => setActiveTab("search")}
                    >
                        Search
                    </button>
                </nav>
                <div
                    className="flex items-center space-x-4 cursor-pointer"
                    onClick={() => navigate("/profile")}
                >
                    <img
                        src="https://i.pinimg.com/474x/6e/49/ae/6e49ae3bc32e955a6bb3aff8f5ad5fe2.jpg"
                        alt="User Avatar"
                        className="w-18 h-12 rounded-full border-2 border-pink-600"
                    />
                    <div>
                        <p className="text-sm font-semibold text-gray-800">John Doe</p>
                        <p className="text-xs text-gray-500">Premium Member</p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1">
                <main className="flex-1 p-6 bg-pink-50">
                    {activeTab === "discover" && (
                        <div className="bg-white rounded-lg shadow-md p-4 space-y-6">
                            {users.map((user) => (
                                <div key={user.id} className="flex items-start">
                                    <img
                                        src={user.avatar}
                                        alt={`${user.name}'s Avatar`}
                                        className="w-32 h-32 rounded-lg"
                                    />
                                    <div className="ml-6">
                                        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                                        <p className="text-lg font-medium text-gray-700">{user.age} years old</p>
                                        <p className="text-sm text-gray-500">{user.compatibility}% Match</p>

                                        <button
                                            className="mt-4 bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700"
                                            onClick={() => navigate(`/profile/${user.id}`)}
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === "messages" && (
                        <div className="bg-white rounded-lg shadow-md p-4">
                            {currentChatUserId === null ? (
                                <>
                                    <h1 className="text-xl font-bold text-gray-800 mb-4">Messages</h1>
                                    {users.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center p-4 border-b cursor-pointer hover:bg-pink-50"
                                            onClick={() => setCurrentChatUserId(user.id)}
                                        >
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div className="ml-4">
                                                <p className="text-sm font-bold text-gray-800">{user.name}</p>
                                                <p className="text-xs text-gray-500">Last message preview...</p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={currentChatUser.avatar}
                                            alt={`${currentChatUser.name}'s Avatar`}
                                            className="w-12 h-12 rounded-full"
                                        />
                                        <h1 className="ml-4 text-xl font-bold text-gray-800">
                                            Chat with {currentChatUser.name}
                                        </h1>
                                    </div>
                                    <div className="space-y-4 overflow-y-auto max-h-96">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                                            >
                                                <div
                                                    className={`p-2 rounded-lg shadow ${msg.sender === "me"
                                                        ? "bg-pink-100 text-gray-800"
                                                        : "bg-gray-100 text-gray-800"
                                                        }`}
                                                >
                                                    {msg.text && <p>{msg.text}</p>}
                                                    {msg.media && (
                                                        <img
                                                            src={msg.media}
                                                            alt="media"
                                                            className="w-32 h-32 rounded-md mt-2"
                                                        />
                                                    )}
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {msg.timestamp} - {msg.status}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex items-center space-x-2">
                                        <input
                                            type="text"
                                            placeholder="Type a message..."
                                            value={messageInput}
                                            onChange={(e) => setMessageInput(e.target.value)}
                                            className="flex-1 p-2 border rounded-lg"
                                        />
                                        <button
                                            onClick={() => setShowEmojiPicker((prev) => !prev)}
                                            className="bg-yellow-400 text-white px-2 py-2 rounded-md"
                                        >
                                            😊
                                        </button>
                                        {showEmojiPicker && (
                                            <div className="absolute bottom-16 left-4 z-10">
                                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            onChange={(e) => setSelectedFile(e.target.files[0])}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label
                                            htmlFor="file-upload"
                                            className="bg-blue-500 text-white px-2 py-2 rounded-md cursor-pointer"
                                        >
                                            📎
                                        </label>
                                        <button
                                            onClick={handleSendMessage}
                                            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === "activities" && (
                        <div className="space-y-4">
                            <div className="flex space-x-4 overflow-x-auto">
                                {stories.map((story) => (
                                    <div key={story.id} className="relative">
                                        <img
                                            src={story.media}
                                            alt={story.user.name}
                                            className="w-24 h-24 rounded-full border-2 border-pink-600"
                                        />
                                        <p className="text-sm text-center mt-2 text-gray-700">{story.user.name}</p>
                                    </div>
                                ))}
                            </div>
                            {posts.map((post) => (
                                <div key={post.id} className="bg-white p-4 rounded-lg shadow space-y-2">
                                    <div className="flex items-center">
                                        <img
                                            src={post.user.avatar}
                                            alt={post.user.name}
                                            className="w-10 h-10 rounded-full border"
                                        />
                                        <p className="ml-4 font-bold text-gray-800">{post.user.name}</p>
                                    </div>
                                    <p className="text-gray-700">{post.content}</p>
                                    {post.media && (
                                        <img src={post.media} alt="Post media" className="w-full rounded-lg mt-2" />
                                    )}
                                    <button
                                        className="text-pink-600 mt-2"
                                        onClick={() => toggleLike(post.id)}
                                    >
                                        {post.liked ? "❤️ Unlike" : "🤍 Like"} ({post.likes})
                                    </button>
                                    <div className="mt-2">
                                        <h3 className="font-bold text-sm text-gray-800">Comments:</h3>
                                        <ul className="space-y-1">
                                            {post.comments.map((comment) => (
                                                <li key={comment.id} className="text-sm text-gray-600">
                                                    {comment.text}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="mt-2 flex items-center space-x-2">
                                            <input
                                                type="text"
                                                placeholder="Add a comment..."
                                                className="flex-1 p-2 border rounded-lg"
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        addComment(post.id, e.target.value);
                                                        e.target.value = ""; // Reset input field
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === "search" ? (
                        <>
                            <h1 className="text-xl font-bold text-gray-800 mb-4">Search</h1>
                            <div className="bg-white p-4 rounded-lg shadow space-y-4">
                                <div className="flex space-x-4">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={searchFilters.name}
                                        onChange={(e) => setSearchFilters({ ...searchFilters, name: e.target.value })}
                                        className="p-2 border rounded-lg flex-1"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Distance (km)"
                                        value={searchFilters.distance}
                                        onChange={(e) =>
                                            setSearchFilters({ ...searchFilters, distance: e.target.value })
                                        }
                                        className="p-2 border rounded-lg flex-1"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Hobby"
                                        value={searchFilters.hobby}
                                        onChange={(e) => setSearchFilters({ ...searchFilters, hobby: e.target.value })}
                                        className="p-2 border rounded-lg flex-1"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
                                    >
                                        Search
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {filteredUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center p-4 border-b cursor-pointer hover:bg-pink-50"
                                            onClick={() => navigate(`/profile/${user.id}`)}
                                        >
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-12 h-12 rounded-full"
                                            />
                                            <div className="ml-4">
                                                <p className="text-sm font-bold text-gray-800">{user.name}</p>
                                                <p className="text-xs text-gray-500">Distance: {user.distance} km</p>
                                                <p className="text-xs text-gray-500">
                                                    Hobbies: {user.hobbies.join(", ")}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Select another tab to view its content.</p>
                    )}
                </main>

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
