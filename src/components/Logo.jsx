const Logo = ({ onClick }) => {
  return (
    <div
      className="text-2xl font-bold text-pink-600 cursor-pointer flex-shrink-0"
      onClick={onClick}
    >
      EliteLusso
    </div>
  );
};

export default Logo;
