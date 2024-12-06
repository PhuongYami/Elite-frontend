import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Filter, Heart, X, Star, Shuffle, 
    MapPin, Users, GraduationCap 
} from 'lucide-react';

// Mock Profiles Data
const mockProfiles = [
    {
        id: 1,
        firstName: 'Emma',
        lastName: 'Johnson',
        age: 28,
        bio: 'Adventure seeker, coffee lover, and aspiring photographer. Looking for someone to explore the world with!',
        photos: [{ url: 'https://picsum.photos/600/800/' }],
        location: { city: 'San Francisco', country: 'USA' },
        occupation: 'Graphic Designer',
        education: 'Master in Design, UCLA',
        height: { $numberDecimal: '1.68' },
        interestedIn: 'Women',
    },
    {
        id: 2,
        firstName: 'Liam',
        lastName: 'Chen',
        age: 32,
        bio: 'Tech entrepreneur with a passion for sustainable innovation. Enjoying life one startup at a time.',
        photos: [{ url: 'https://picsum.photos/600/800' }],
        location: { city: 'Seattle', country: 'USA' },
        occupation: 'Software Engineer',
        education: 'Computer Science, Stanford',
        height: { $numberDecimal: '1.82' },
        interestedIn: 'Men',
    },
    {
        id: 3,
        firstName: 'Sofia',
        lastName: 'Rodriguez',
        age: 29,
        bio: 'Yoga instructor, world traveler, and plant-based foodie. Seeking a connection that goes beyond the surface.',
        photos: [{ url: 'https://picsum.photos/600/800' }],
        location: { city: 'Miami', country: 'USA' },
        occupation: 'Wellness Coach',
        education: 'Health Sciences, NYU',
        height: { $numberDecimal: '1.65' },
        interestedIn: 'All',
    }
];

const Discover = () => {
    const [profiles] = useState(mockProfiles);
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [showFilters, setShowFilters] = useState(false);

    const handleSwipe = (action) => {
        // Logic for swiping/matching/skipping profiles
        setCurrentProfileIndex(prev => (prev + 1) % profiles.length);
    };

    const toggleFilters = () => setShowFilters(!showFilters);

    const currentProfile = profiles[currentProfileIndex];

    return (
        <div className=" bg-neutral-50 flex justify-center items-center p-6">
            <div className="w-full max-w-4xl">
                 {/* Filter and Shuffle Toggle */}
                 <div className="flex justify-end space-x-4 mb-4">
                    <button 
                        onClick={() => handleSwipe()}
                        className="bg-white shadow-md rounded-full p-3 hover:bg-neutral-100 transition"
                    >
                        <Shuffle />
                    </button>
                    <button 
                        onClick={toggleFilters}
                        className="bg-white shadow-md rounded-full p-3 hover:bg-neutral-100 transition"
                    >
                        <Filter />
                    </button>
                </div>

                {showFilters && <DiscoverFilters />}

                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
                    {/* Profile Images */}
                    <div className="relative">
                        <img 
                            src={currentProfile.photos[0].url} 
                            alt={currentProfile.firstName} 
                            className="w-full h-full object-cover" 
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent p-6 text-white">
                            <h2 className="text-3xl font-thin">{currentProfile.firstName}, {currentProfile.age}</h2>
                            <div className="flex items-center space-x-2 mt-2">
                                <MapPin size={18} />
                                <span>{currentProfile.location.city}, {currentProfile.location.country}</span>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8 space-y-6">
                        <section>
                            <h3 className="text-2xl font-light text-neutral-800 border-b pb-3 mb-4 flex items-center">
                                <Users className="mr-3 text-neutral-600" />
                                About
                            </h3>
                            <p className="text-neutral-600 italic">{currentProfile.bio}</p>
                        </section>

                        <section>
                            <h3 className="text-2xl font-light text-neutral-800 border-b pb-3 mb-4 flex items-center">
                                <GraduationCap className="mr-3 text-neutral-600" />
                                Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailItem label="Occupation" value={currentProfile.occupation} />
                                <DetailItem label="Education" value={currentProfile.education} />
                                <DetailItem label="Height" value={`${parseFloat(currentProfile.height.$numberDecimal)} m`} />
                                <DetailItem label="Interested In" value={currentProfile.interestedIn} />
                            </div>
                        </section>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-3 gap-4">
                            <button 
                                onClick={() => handleSwipe('skip')}
                                className="bg-red-100 text-red-700 py-3 rounded-full hover:bg-red-200 transition flex items-center justify-center"
                            >
                                <X size={24} />
                            </button>
                            <button 
                                onClick={() => handleSwipe('superlike')}
                                className="bg-purple-100 text-purple-700 py-3 rounded-full hover:bg-purple-200 transition flex items-center justify-center"
                            >
                                <Star size={24} />
                            </button>
                            <button 
                                onClick={() => handleSwipe('like')}
                                className="bg-green-100 text-green-700 py-3 rounded-full hover:bg-green-200 transition flex items-center justify-center"
                            >
                                <Heart size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-xs text-neutral-500 uppercase">{label}</p>
        <p className="text-neutral-800 font-medium">{value || 'Not specified'}</p>
    </div>
);

const DiscoverFilters = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        ageRange: '',
        distance: '',
        interests: ''
    });

    const handleFilterChange = (filter, value) => {
        setSelectedFilters(prev => ({
            ...prev,
            [filter]: value
        }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-light text-neutral-800 border-b pb-3 mb-4">Filters</h3>
            <div className="grid md:grid-cols-3 gap-4">
                <FilterSelect 
                    label="Age Range" 
                    options={['18-25', '26-35', '36-45', '46-55', '55+']}
                    value={selectedFilters.ageRange}
                    onChange={(value) => handleFilterChange('ageRange', value)}
                />
                <FilterSelect 
                    label="Distance" 
                    options={['0-10 km', '10-50 km', '50-100 km', '100+ km']}
                    value={selectedFilters.distance}
                    onChange={(value) => handleFilterChange('distance', value)}
                />
                <FilterSelect 
                    label="Interests" 
                    options={['Travel', 'Music', 'Sports', 'Reading', 'Technology']}
                    value={selectedFilters.interests}
                    onChange={(value) => handleFilterChange('interests', value)}
                />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button 
                    className="text-neutral-600 hover:text-neutral-800"
                    onClick={() => setSelectedFilters({ ageRange: '', distance: '', interests: '' })}
                >
                    Reset
                </button>
                <button 
                    className="bg-neutral-800 text-white px-6 py-2 rounded-full hover:bg-neutral-700"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

const FilterSelect = ({ label, options, value, onChange }) => {
    return (
        <div>
            <label className="text-sm text-neutral-600 block mb-2">{label}</label>
            <select 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300"
            >
                <option value="">Select {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Discover;