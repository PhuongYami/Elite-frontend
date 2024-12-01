const UserSection = ({
  isAuthenticated,
  loading,
  error,
  onLogout,
  onLogin,
  onRegister,
}) => {
  if (loading) {
    return <p className="text-sm text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">Error: {error}</p>;
  }

  return isAuthenticated ? (
    <div className="flex items-center space-x-4 flex-shrink-0">
      <img
        src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=150"
        alt="User Avatar"
        className="w-10 h-10 rounded-full border-2 border-pink-600"
      />
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
