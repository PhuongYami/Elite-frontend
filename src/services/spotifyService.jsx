import axios from "axios";

// Hàm lấy Access Token từ Spotify API
export const fetchSpotifyToken = async () => {
    const clientId = "2593a4ba773c426fb74940c3a60768a0"; // Thay bằng Client ID của bạn
    const clientSecret = "89a258a5964f44a7840dbc06c6354004"; // Thay bằng Client Secret của bạn

    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            "grant_type=client_credentials",
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Mã hóa Base64
                },
            }
        );
        return response.data.access_token; // Trả về Access Token
    } catch (error) {
        console.error("Error fetching Spotify token:", error);
        return null; // Trả về null nếu có lỗi
    }
};
