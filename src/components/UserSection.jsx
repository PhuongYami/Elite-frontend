const UserSection = ({ isAuthenticated, user, onLogout, onLogin, onRegister }) => {
  return isAuthenticated ? (
    <div className="flex items-center space-x-4 flex-shrink-0">
      <img
        src={user?.avatar || "https://via.placeholder.com/150"}
        alt={`${user?.username || "User"}'s Avatar`}
        className="w-10 h-10 rounded-full border-2 border-pink-600 object-cover"
      />
      <span className="text-sm font-medium text-gray-700">{user?.username}</span>
      <button
        onClick={onLogout}
        className="text-sm text-pink-600 hover:underline"
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="flex space-x-4 flex-shrink-0">
      <button
        className="text-gray-700 hover:text-pink-600"
        onClick={onLogin}
      >
        Đăng nhập
      </button>
      <button
        className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        onClick={onRegister}
      >
        Đăng ký
      </button>
    </div>
  );
};

export default UserSection;
