import React from 'react';
import { MapPin } from 'lucide-react';

const ProfileCard = ({ profile }) => {
    if (!profile) return <p>No profile data</p>;

    return (
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
            <div className="relative">
                <img
                    src={profile.photos?.[0]?.url || 'https://via.placeholder.com/600'}
                    alt={profile.firstName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent p-6 text-white">
                    <h2 className="text-3xl font-thin">
                        {profile.firstName}, {profile.age}
                    </h2>
                    <div className="flex items-center space-x-2 mt-2">
                        <MapPin size={18} />
                        <span>{profile.location?.city}, {profile.location?.country}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
