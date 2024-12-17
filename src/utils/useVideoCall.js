import { useEffect, useRef } from 'react';
import socket from './socket'; // Đảm bảo file socket.js đã được cấu hình

const useVideoCall = (conversationId) =>
{
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);

    useEffect(() =>
    {
        // Lắng nghe sự kiện từ Socket.IO
        socket.on('offer', handleReceiveOffer);
        socket.on('answer', handleReceiveAnswer);
        socket.on('iceCandidate', handleReceiveICECandidate);

        return () =>
        {
            socket.off('offer', handleReceiveOffer);
            socket.off('answer', handleReceiveAnswer);
            socket.off('iceCandidate', handleReceiveICECandidate);
        };
    }, [conversationId]);

    const startVideoCall = async () =>
    {
        try
        {
            // Lấy video và audio từ user
            const localStream = await navigator.mediaDevices.getUserMedia(
                {
                    video: {
                        width: { ideal: 1920 }, // Chất lượng HD (1280x720)
                        height: { ideal: 1080 }
                    },
                    audio: {
                        echoCancellation: true, // Giảm tiếng vọng
                        noiseSuppression: true, // Giảm nhiễu
                        autoGainControl: true,  // Tự động cân chỉnh âm lượng
                    },
                });
            localVideoRef.current.srcObject = localStream;

            // Tạo PeerConnection
            peerConnection.current = new RTCPeerConnection();
            localStream.getTracks().forEach((track) =>
            {
                peerConnection.current.addTrack(track, localStream);
            });

            // Xử lý track từ đối phương
            peerConnection.current.ontrack = (event) =>
            {
                remoteVideoRef.current.srcObject = event.streams[0];
            };

            // Gửi ICE Candidate qua socket
            peerConnection.current.onicecandidate = (event) =>
            {
                if (event.candidate)
                {
                    socket.emit('iceCandidate', { conversationId, candidate: event.candidate });
                }
            };

            // Tạo và gửi Offer
            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);
            socket.emit('offer', { conversationId, offer });
        } catch (error)
        {
            console.error('Error starting video call:', error);
        }
    };

    const handleReceiveOffer = async ({ offer }) =>
    {
        if (!peerConnection.current)
        {
            peerConnection.current = new RTCPeerConnection();
        }

        // Nhận Offer và gửi Answer
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.current.createAnswer();
        await peerConnection.current.setLocalDescription(answer);
        socket.emit('answer', { conversationId, answer });
    };

    const handleReceiveAnswer = async ({ answer }) =>
    {
        if (peerConnection.current)
        {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
        }
    };

    const handleReceiveICECandidate = async ({ candidate }) =>
    {
        if (peerConnection.current)
        {
            await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
    };

    const endVideoCall = () =>
    {
        if (peerConnection.current)
        {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        if (localVideoRef.current)
        {
            localVideoRef.current.srcObject = null;
        }
        if (remoteVideoRef.current)
        {
            remoteVideoRef.current.srcObject = null;
        }
    };

    return { localVideoRef, remoteVideoRef, startVideoCall, endVideoCall };
};

export default useVideoCall;
