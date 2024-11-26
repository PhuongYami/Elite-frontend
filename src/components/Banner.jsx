import React from "react";

const Banner = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/1200')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 text-center flex flex-col justify-center items-center h-full text-white">
        <h1 className="text-5xl font-bold">Tìm kiếm tình yêu đích thực</h1>
        <p className="mt-4 text-lg">Kết nối với những người thành đạt, thông minh, và đầy hấp dẫn.</p>
        <button className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700">
          Tham gia ngay
        </button>
      </div>
    </div>
  );
};

export default Banner;
