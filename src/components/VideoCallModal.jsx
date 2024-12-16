import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';

const VideoCallModal = ({ 
    localVideoRef, 
    remoteVideoRef, 
    onEndCall, 
    incomingCall, 
    onAcceptCall, 
    otherParticipant 
}) => {
    const [isMicMuted, setIsMicMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);

    // Incoming call view
    if (incomingCall) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 text-center">
                    <div className="mb-6">
                        <img 
                            src={otherParticipant.avatar || '/placeholder.jpg'} 
                            alt="Caller" 
                            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 shadow-lg"
                        />
                        <h2 className="text-2xl font-semibold text-neutral-800">
                            {otherParticipant.username} is calling
                        </h2>
                        <p className="text-neutral-600 mt-2">Video Call</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button 
                            onClick={onAcceptCall}
                            className="bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition-colors"
                        >
                            <Phone size={24} />
                        </button>
                        <button 
                            onClick={onEndCall}
                            className="bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-colors"
                        >
                            <PhoneOff size={24} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Active call view
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div className="w-full max-w-6xl h-[90vh] flex flex-col">
                {/* Remote Video (Larger) */}
                <div className="flex-grow relative mb-4 rounded-2xl overflow-hidden">
                    <video 
                        ref={remoteVideoRef} 
                        autoPlay 
                        className="w-full h-full object-cover"
                    />
                    {/* Local Video (Small Overlay) */}
                    <div className="absolute bottom-4 right-4 w-1/5 max-w-[250px] aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-white">
                        <video 
                            ref={localVideoRef} 
                            autoPlay 
                            muted 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Control Buttons */}
                <div className="flex justify-center space-x-4 bg-neutral-900 bg-opacity-50 p-4 rounded-full">
                    <button 
                        onClick={() => setIsMicMuted(!isMicMuted)}
                        className={`p-3 rounded-full ${
                            isMicMuted 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white bg-opacity-20 text-white'
                        }`}
                    >
                        {isMicMuted ? <MicOff /> : <Mic />}
                    </button>
                    <button 
                        onClick={() => setIsVideoOff(!isVideoOff)}
                        className={`p-3 rounded-full ${
                            isVideoOff 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white bg-opacity-20 text-white'
                        }`}
                    >
                        {isVideoOff ? <VideoOff /> : <Video />}
                    </button>
                    <button 
                        onClick={onEndCall}
                        className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600"
                    >
                        <PhoneOff />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoCallModal;