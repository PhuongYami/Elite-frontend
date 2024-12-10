import AxiosInstance from '../utils/axiosInstance'

export const fetchMatches = async (userId, filters) =>
{
    const queryParams = new URLSearchParams(filters).toString();
    const response = await AxiosInstance.get(`/match/?userId=${ userId }&${ queryParams }`);
    return response.data;
};
