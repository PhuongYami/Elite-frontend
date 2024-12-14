import axiosInstance from '../utils/axiosInstance';

// Gọi API xóa tin nhắn
export const deleteMessageApi = (messageId) =>
{
    return axiosInstance.delete(`/message/${ messageId }`);
};

// Gọi API đánh dấu tin nhắn đã đọc
export const markMessageAsReadApi = (messageId) =>
{
    return axiosInstance.patch(`/message/${ messageId }/read`);
};

// Gọi API lấy danh sách tin nhắn
export const fetchMessagesApi = (conversationId, limit, offset) =>
{
    return axiosInstance.get(`/conversations/messages/${ conversationId }`, {
        params: { limit, offset },
    });
};

// Gọi API gửi tin nhắn
export const sendMessageApi = (conversationId, content, messageType, receiver) =>
{
    return axiosInstance.post('/conversations/send', {
        conversationId,
        content,
        message_type: messageType,
        receiver,
    });
};
