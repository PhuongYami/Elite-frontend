import { useEffect, useRef } from 'react';
import socket from './socket';

const useVideoCall = (conversationId) =>
{
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const peerConnection = useRef(null);

    useEffect(() =>
    {
        // Listen to signaling events
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
            const localStream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 1920 }, height: { ideal: 1080 } },
                audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
            });

            localVideoRef.current.srcObject = localStream;

            // Create PeerConnection
            peerConnection.current = new RTCPeerConnection({
                iceServers:
                    [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' },
                        { urls: 'stun:stun2.l.google.com:19302' },
                    ],
            });

            // Add local stream tracks
            localStream.getTracks().forEach((track) =>
            {
                peerConnection.current.addTrack(track, localStream);
            });

            // Set up remote track listener
            peerConnection.current.ontrack = (event) =>
            {
                remoteVideoRef.current.srcObject = event.streams[0];
            };

            // Handle ICE candidates
            peerConnection.current.onicecandidate = (event) =>
            {
                if (event.candidate)
                {
                    socket.emit('iceCandidate', { conversationId, candidate: event.candidate });
                }
            };

            // Create and send offer
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
            peerConnection.current = new RTCPeerConnection({
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
            });
        }

        if (peerConnection.current.signalingState !== 'stable')
        {
            console.warn('Received offer in wrong state:', peerConnection.current.signalingState);
            return;
        }

        try
        {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            socket.emit('answer', { conversationId, answer });
        } catch (error)
        {
            console.error('Error handling offer:', error);
        }
    };

    const handleReceiveAnswer = async ({ answer }) =>
    {
        if (!peerConnection.current)
        {
            console.warn('PeerConnection not initialized when receiving answer');
            return;
        }

        if (peerConnection.current.signalingState !== 'have-local-offer')
        {
            // console.warn('Received answer in wrong state:', peerConnection.current.signalingState);
            // return;
            if (peerConnection.current.signalingState === 'stable')
            {
                console.warn('Resetting peer connection');
                peerConnection.current.close();
                peerConnection.current = null;

                // Reinitialize connection
                await startVideoCall();
                return;
            }

            console.warn(`Unexpected signaling state: ${ peerConnection.current.signalingState }`);
            return;
        }

        try
        {
            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (error)
        {
            console.error('Error handling answer:', error);
        }
    };

    const handleReceiveICECandidate = async ({ candidate }) =>
    {
        if (peerConnection.current)
        {
            try
            {
                await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
            } catch (error)
            {
                console.error('Error adding ICE candidate:', error);
            }
        }
    };

    const endVideoCall = () =>
    {
        if (peerConnection.current)
        {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        if (localVideoRef.current) localVideoRef.current.srcObject = null;
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    };

    return { localVideoRef, remoteVideoRef, startVideoCall, endVideoCall };
};

export default useVideoCall;
