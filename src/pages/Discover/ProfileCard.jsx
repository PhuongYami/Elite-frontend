import React from 'react';
import { MapPin } from 'lucide-react';

const ProfileCard = ({ profile }) => {
    return (
        <div className="relative">
            <img
                src={profile.avatar || 'https://picsum.photos/600/800/'}
                alt={`${profile.firstName}'s profile`}
                className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent p-6 text-white">
                <div className="flex items-center space-x-2">
                    <h2 className="text-3xl font-thin">
                        {profile.firstName}, {profile.age}
                    </h2>
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {profile.compatibilityScore}%
                    </div>
                </div>
                <div className="flex items-center space-x-2 mt-2">
                    <MapPin size={18} />
                    <span>{profile.workLocation || 'Location Not Specified'}</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;