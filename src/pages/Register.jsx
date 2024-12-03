import React, { useState } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/authSlice'; // Import từ slice của bạn
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    location: {
      coordinates: [0, 0],
      city: '',
      country: '',
      isDetecting: false,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value,
      },
    }));
  };

  const detectLocation = () => {
    if ('geolocation' in navigator) {
      setFormData((prevState) => ({
        ...prevState,
        location: {
          ...prevState.location,
          isDetecting: true,
        },
      }));

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            setFormData((prevState) => ({
              ...prevState,
              location: {
                coordinates: [longitude, latitude],
                city: data.address.city || data.address.town || data.address.village || '',
                country: data.address.country || '',
                isDetecting: false,
              },
            }));
          } catch (error) {
            console.error('Lỗi khi lấy thông tin địa điểm:', error);
            setFormData((prevState) => ({
              ...prevState,
              location: {
                ...prevState.location,
                coordinates: [longitude, latitude],
                isDetecting: false,
              },
            }));
          }
        },
        (error) => {
          console.error('Lỗi khi lấy vị trí:', error);
          setFormData((prevState) => ({
            ...prevState,
            location: {
              ...prevState.location,
              isDetecting: false,
            },
          }));
          alert('Không thể lấy vị trí. Vui lòng nhập thủ công.');
        }
      );
    } else {
      alert('Trình duyệt của bạn không hỗ trợ định vị.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      console.log(result);
      alert('Mã OTP đã được gửi tới email của bạn. Vui lòng kiểm tra!');
      navigate('/otp-verification', { state: { email: formData.email } }); // Chuyển hướng tới trang OTP với email
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Đăng Ký</h2>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Tên"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Họ"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Tên đăng nhập"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Mật khẩu"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Số điện thoại"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn giới tính</option>
            <option value="Male">Nam</option>
            <option value="Female">Nữ</option>
            <option value="Other">Khác</option>
          </select>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="city"
                value={formData.location.city}
                onChange={handleLocationChange}
                placeholder="Thành phố"
                required
                className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={detectLocation}
                disabled={formData.location.isDetecting}
                className="p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
              >
                {formData.location.isDetecting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <MapPin className="h-5 w-5" />
                )}
              </button>
            </div>

            <input
              type="text"
              name="country"
              value={formData.location.country}
              onChange={handleLocationChange}
              placeholder="Quốc gia"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Đang xử lý...' : 'Đăng Ký'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
