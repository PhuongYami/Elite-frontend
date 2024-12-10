import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Filter, Heart, X, Star, Shuffle, MapPin, Users, GraduationCap, Clock } from 'lucide-react';
import { fetchBasicSearch } from '../../api/searchApi';
import { useSelector, useDispatch } from 'react-redux';
import {fetchCurrentUser,setUserPreferences } from '../../features/user/userSlice';

const Discover = () => {
    const [profiles, setProfiles] = useState([]); 
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, userId=null,   userPreferences: { defaultFilters: initialDefaultFilters }  } = useSelector((state) => state.user);

    const dispatch = useDispatch();
     // Add a default filters object
     const defaultFilters = useMemo(() => ({
        ageRange: { min: 20, max: 55 },
        interestedIn: "Female",
        location: { lat: 10.61905, lng: 106.614395 },
        locationRadius: 30,
    }), []);
    
    useEffect(() => {
        if (user?.profile) {
            const userFilters = {
                ageRange: user.profile.preferenceAgeRange || defaultFilters.ageRange,
                interestedIn: user.profile.interestedIn || defaultFilters.interestedIn,
                location: user.profile.location?.coordinates || defaultFilters.location,
                locationRadius: user.profile.locationRadius || defaultFilters.locationRadius,
            };
            setDraftFilters(userFilters);
            setAppliedFilters(userFilters);
        }
    }, [user, defaultFilters]);
    // Use a safer way to initialize draft filters
    const [draftFilters, setDraftFilters] = useState(defaultFilters);
    const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
   


    // Sử dụng useCallback để tối ưu hóa việc load profiles
    const loadProfiles = useCallback(async () => {
        setLoading(true);
        try {
            // Correctly structure the filters as a JSON string
            const filters = JSON.stringify({
                ageRange: appliedFilters.ageRange,
                interestedIn: appliedFilters.interestedIn,
                location: appliedFilters.location,
                locationRadius: appliedFilters.locationRadius
            });
    
            // Pass userId and filters separately
            const data = await fetchBasicSearch(userId, filters);
            
            const processedProfiles = data.map(item => ({
                ...item.user,
                compatibilityScore: item.compatibilityScore,
                age: calculateAge(item.user.dateOfBirth)
            }));
            
            setProfiles(processedProfiles);
            setCurrentProfileIndex(0);
        } catch (error) {
            console.error('Error loading profiles:', error);
            setError('Failed to load profiles. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [appliedFilters, userId]);
    useEffect(() => {
        if (!userId) {
            dispatch(fetchCurrentUser());
        } else {
            loadProfiles(); // Gọi trực tiếp khi có userId
        }
    }, [userId, dispatch, loadProfiles]);

    
    const calculateAge = (dateOfBirth) => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const handleSwipe = (action) => {
        if (profiles.length > 0) {
            setCurrentProfileIndex((prev) => (prev + 1) % profiles.length);
        }
    };

    const toggleFilters = () => setShowFilters(!showFilters);

    // Cập nhật draft filters
    const handleDraftFilterChange = (filter, value) => {
        setDraftFilters((prev) => ({
            ...prev,
            [filter]: value,
        }));
    };

    // Áp dụng filters mới
    const applyFilters = () => {
        setAppliedFilters(draftFilters);
        
        // Lưu filters vào Redux state
        dispatch(setUserPreferences({ 
            defaultFilters: draftFilters 
        }));

        setShowFilters(false);
    };

    const resetFilters = () => {
        const defaultFilters = {
            ageRange: { min: 20, max: 55 },
            interestedIn: "Female",
            location: { lat: 10.61905, lng: 106.614395 },
            locationRadius: 30,
        };

        setDraftFilters(defaultFilters);
        setAppliedFilters(defaultFilters);

        // Cập nhật lại default filters trong Redux state
        dispatch(setUserPreferences({ 
            defaultFilters 
        }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading profiles...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>{error}</p>
            </div>
        );
    }

    if (profiles.length === 0) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>No profiles found. Try adjusting your filters.</p>
            </div>
        );
    }

    const currentProfile = profiles[currentProfileIndex] || {};

    return (
        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 min-h-screen flex justify-center items-center p-6">
            <div className="w-full max-w-5xl">
                {/* Top Actions */}
                <div className="flex justify-end space-x-4 mb-6">
                    <button
                        onClick={() => handleSwipe('shuffle')}
                        className="bg-white shadow-md rounded-full p-3 hover:bg-neutral-100 transition"
                    >
                        <Shuffle className="text-neutral-600" />
                    </button>
                    <button
                        onClick={toggleFilters}
                        className="bg-white shadow-md rounded-full p-3 hover:bg-neutral-100 transition"
                    >
                        <Filter className="text-neutral-600" />
                    </button>
                </div>

                {/* Filter Panel */}
                {showFilters && (
            <DiscoverFilters
                filters={draftFilters}
                onFilterChange={handleDraftFilterChange}
                onReset={resetFilters}
                onApply={applyFilters}
            />
        )}

                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
                    {/* Profile Image */}
                    <div className="relative">
                        <img
                            src={currentProfile.avatar|| 'https://picsum.photos/600/800/'}
                            alt={`${currentProfile.firstName}'s profile`}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent p-6 text-white">
                            <div className="flex items-center space-x-2">
                                <h2 className="text-3xl font-thin">
                                    {currentProfile.firstName}, {currentProfile.age}
                                </h2>
                                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                    {currentProfile.compatibilityScore}%
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                                <MapPin size={18} />
                                <span>{currentProfile.workLocation || 'Location Not Specified'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="p-8 flex flex-col">
                        <div className="flex-grow">
                            {/* About Section */}
                            <section className="mb-6">
                                <h3 className="text-2xl font-light text-neutral-800 border-b pb-3 mb-4 flex items-center">
                                    <Users className="mr-3 text-neutral-600" />
                                    About
                                </h3>
                                <p className="text-neutral-600 italic h-20 overflow-hidden">
                                    {currentProfile.bio || 'No bio available.'}
                                </p>
                            </section>

                            {/* Details Section */}
                            <section className="mb-6">
                                <h3 className="text-2xl font-light text-neutral-800 border-b pb-3 mb-4 flex items-center">
                                    <GraduationCap className="mr-3 text-neutral-600" />
                                    Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                            {/* Occupation - Full width */}
                            <div className="col-span-2">
                                <DetailItem 
                                label="Occupation" 
                                value={currentProfile.occupation} 
                                className="truncate"
                                />
                            </div>

                            {/* Education - Full width */}
                            <div className="col-span-2">
                                <DetailItem 
                                label="Education" 
                                value={currentProfile.education} 
                                className="truncate"
                                />
                            </div>

                            {/* Other fields - 2 rows, 2 columns */}
                            <DetailItem 
                                label="Height"
                                value={`${currentProfile.height?.$numberDecimal || 'Not specified'} m`}
                                className="truncate"
                            />
                            <DetailItem 
                                label="Interested In" 
                                value={currentProfile.interestedIn} 
                                className="truncate"
                            />
                            <DetailItem 
                                label="Drinking" 
                                value={currentProfile.drinking} 
                                className="truncate"
                            />
                            <DetailItem 
                                label="Smoking" 
                                value={currentProfile.smoking} 
                                className="truncate"
                            />
                            </div>

                            </section>

                            {/* Life Goals */}
                            <section>
                                <h3 className="text-2xl font-light text-neutral-800 border-b pb-3 mb-4 flex items-center">
                                    <Clock className="mr-3 text-neutral-600" />
                                    Goals
                                </h3>
                                <div className="flex space-x-2">
                                    <DetailItem 
                                        label="Relationship Goal" 
                                        value={currentProfile.goals} 
                                    />
                                    <DetailItem 
                                        label="Children" 
                                        value={`${currentProfile.children} `} 
                                    />
                                </div>
                            </section>
                        </div>

                        {/* Action Buttons - Now positioned at the bottom */}
                        <div className="grid grid-cols-3 gap-4 mt-6">
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

// Detail Item Component
const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-xs text-neutral-500 uppercase">{label}</p>
        <p className="text-neutral-800 font-medium">{value || 'Not specified'}</p>
    </div>
);

// Filters Component (remains mostly the same)
const DiscoverFilters = ({ filters, onFilterChange, onReset, onApply }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h3 className="text-2xl font-light text-neutral-800 border-b pb-3 mb-4">Filters</h3>
        <div className="grid md:grid-cols-3 gap-4">
            {/* Age Range */}
            <div>
                <label className="text-sm text-neutral-600 block mb-2">Age Range</label>
                <div className="flex space-x-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={filters.ageRange.min}
                        onChange={(e) =>
                            onFilterChange('ageRange', {
                                ...filters.ageRange,
                                min: Number(e.target.value),
                            })
                        }
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800"
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        value={filters.ageRange.max}
                        onChange={(e) =>
                            onFilterChange('ageRange', {
                                ...filters.ageRange,
                                max: Number(e.target.value),
                            })
                        }
                        className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800"
                    />
                </div>
            </div>

            {/* Interested In */}
            <FilterSelect
                label="Interested In"
                options={['Male', 'Female', 'Other']}
                value={filters.interestedIn}
                onChange={(value) => onFilterChange('interestedIn', value)}
            />

            {/* Location Radius */}
            <div>
                <label className="text-sm text-neutral-600 block mb-2">Location Radius (km)</label>
                <input
                    type="number"
                    placeholder="Radius"
                    value={filters.locationRadius}
                    onChange={(e) => onFilterChange('locationRadius', Number(e.target.value))}
                    className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800"
                />
            </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
            <button className="text-neutral-600 hover:text-neutral-800" onClick={onReset}>
                Reset
            </button>
            <button 
                onClick={onApply}
                className="bg-neutral-800 text-white px-6 py-2 rounded-full hover:bg-neutral-700"
            >
                Apply
            </button>
        </div>
    </div>
);

// Filter Select Component
const FilterSelect = ({ label, options, value, onChange }) => (
    <div>
        <label className="text-sm text-neutral-600 block mb-2">{label}</label>
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300"
        >
            <option value="">Select {label}</option>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

export default Discover;

