import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Filter, Shuffle } from 'lucide-react';
import { fetchBasicSearch } from '../../api/searchApi';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser, setUserPreferences } from '../../features/user/userSlice';
import { createInteraction,undoLastInteraction } from '../../api/interactionApi';
import { toast } from 'react-toastify';

import ProfileCard from './ProfileCard';
import ProfileDetails from './ProfileDetails';
import ProfileActionButtons from './ProfileActionButtons';
import DiscoverFilters from './DiscoverFilters';

const Discover = () => {
    const [profiles, setProfiles] = useState([]); 
    const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [swipeStack, setSwipeStack] = useState([]);

    const { user, userId = null, userPreferences: { defaultFilters: initialDefaultFilters } } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const defaultFilters = useMemo(() => ({
        ageRange: { min: 20, max: 55 },
        interestedIn: "Female",
        location: { lat: 10.61905, lng: 106.614395 },
        locationRadius: 30,
    }), []);

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

    const handleSwipe = async (action) => {
        if (profiles.length > 0) {
            const currentProfile = profiles[currentProfileIndex];
    
            try {
                if (action !== 'undo') {
                    // Save interaction to backend
                    const interactionData = {
                        userFrom: userId,
                        userTo: currentProfile.userId,
                        type: action === 'superlike' ? 'SuperLike' :
                              action === 'like' ? 'Like' :
                              action === 'dislike' ? 'Dislike':
                              null
                    };
                    const response = await createInteraction(interactionData);

                    // Check if a match is made
                    if (response.message === 'Matched successfully!') {
                        toast.success(`You and ${currentProfile.firstName} matched! 🎉`);
                    }
    
                    // Update local state
                    setSwipeStack((prev) => [...prev, { ...currentProfile, action }]);
                    setCurrentProfileIndex((prev) => (prev + 1) % profiles.length);
                } else {
                    // Handle undo action
                    
                    const lastInteraction = swipeStack.pop();
                    if (!lastInteraction) {
                        console.warn('No interactions to undo.');
                        return;
                    }
                    if (lastInteraction) {
                        // Optionally remove the interaction from backend
                        await undoLastInteraction(userId); // Assuming `undoLastInteraction` API is defined
                        setSwipeStack([...swipeStack]); // Update state after undoing
                        setCurrentProfileIndex(
                            (prev) => (prev - 1 + profiles.length) % profiles.length
                        );
                    } else {
                        console.warn('No interactions to undo');
                    }
                }
            } catch (error) {
                console.error('Error handling swipe action:', error);
                // Optionally show error toast/message
            }
        }
    };

    const toggleFilters = () => setShowFilters(!showFilters);

    const handleDraftFilterChange = (filter, value) => {
        setDraftFilters((prev) => ({
            ...prev,
            [filter]: value,
        }));
    };

    const applyFilters = () => {
        setAppliedFilters(draftFilters);
        dispatch(setUserPreferences({ 
            defaultFilters: draftFilters 
        }));
        setShowFilters(false);
    };

    const resetFilters = () => {
        const resetDefaultFilters = {
            ageRange: { min: 20, max: 55 },
            interestedIn: "Female",
            location: { lat: 10.61905, lng: 106.614395 },
            locationRadius: 30,
        };

        setDraftFilters(resetDefaultFilters);
        setAppliedFilters(resetDefaultFilters);
        dispatch(setUserPreferences({ 
            defaultFilters: resetDefaultFilters 
        }));
    };

    // Loading, error, and empty states
    if (loading) return <div className="flex justify-center items-center h-screen">Loading profiles...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">{error}</div>;
    if (profiles.length === 0) return <div className="flex justify-center items-center h-screen">No profiles found. Try adjusting your filters.</div>;

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
                    <ProfileCard profile={currentProfile} />
                    <div className="flex flex-col">
                        <ProfileDetails profile={currentProfile} />
                        <ProfileActionButtons
                            onUndo={() => handleSwipe('undo')}
                            onSkip={() => handleSwipe('dislike')}
                            onSuperLike={() => handleSwipe('superlike')}
                            onLike={() => handleSwipe('like')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Discover;
