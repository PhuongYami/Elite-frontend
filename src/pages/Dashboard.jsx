import React, { useEffect, useState } from 'react';
import { 
    Activity, Heart, Users, MessageSquare, 
    Zap, TrendingUp, Target, Award, 
    User, Mail, MapPin, ChevronRight, ChevronLeft
} from 'lucide-react';
import { fetchRecommendations } from '../api/searchApi';
import { useSelector } from 'react-redux';

// Mock Dashboard Data (keeping as fallback)
const mockDashboardData = {
    profileViews: 1247,
    matches: 42,
    newMessages: 8,
    profileCompleteness: 85,
    recentActivity: [
        { 
            icon: <User />, 
            message: 'Your profile was viewed by Emma', 
            timestamp: '2 hours ago' 
        },
        { 
            icon: <Heart />, 
            message: 'You matched with Liam', 
            timestamp: 'Yesterday' 
        },
        { 
            icon: <Mail />, 
            message: 'New message from Sofia', 
            timestamp: '3 days ago' 
        }
    ],
};

const Dashboard = () => {
    const [data, setData] = useState(mockDashboardData);
    const [recommendedMatches, setRecommendedMatches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalMatches, setTotalMatches] = useState(0);

    // Get user ID from Redux store
    const userId = useSelector(state => state.user.userId);
     const maxPages = 5; // Tối đa 5 trang

    useEffect(() => {
        const loadRecommendations = async () => {
            if (!userId) return;

            setLoading(true);
            try {
                const response = await fetchRecommendations(userId, 3, currentPage);
                
                if (response.results && response.results.length > 0) {
                    const apiMatches = response.results.map(match => ({
                        name: match.user.firstName +" "+ match.user.lastName || 'Unknown',
                        age: calculateAge(match.user.dateOfBirth),
                        location: formatLocation(match.user.location),
                        avatar: match.user.profilePicture || 'https://picsum.photos/400',
                        compatibility: Math.round(match.compatibilityScore),
                        interests: match.user.interests || [],
                        id: match.user._id
                    }));
                    setRecommendedMatches(apiMatches);
                    setTotalMatches(response.totalMatches || 0);
                }
            } catch (err) {
                console.error('Error fetching recommendations:', err);
                setError(err.message || 'Failed to load recommendations');
            } finally {
                setLoading(false);
            }
        };

        loadRecommendations();
    }, [userId, currentPage]);

    const handleNextPage = () => {
        // Kiểm tra xem còn hồ sơ để hiển thị không
        if (currentPage * 3 < totalMatches) {
            setCurrentPage(prev => prev + 1);
        }
    };
    
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    // Helper function to calculate age
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age;
    };

    // Helper function to format location
    const formatLocation = (location) => {
        if (!location || !location.city || !location.country) return 'Unknown';
        return `${location.city}, ${location.country}`;
    };


    return (
        <div className="min-h-screen bg-neutral-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-thin text-neutral-800 mb-8">Dashboard</h1>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <StatCard 
                        icon={<Users />} 
                        title="Profile Views" 
                        value={data.profileViews} 
                        color="from-blue-100 to-blue-200" 
                    />
                    <StatCard 
                        icon={<Heart />} 
                        title="Matches" 
                        value={data.matches} 
                        color="from-pink-100 to-pink-200" 
                    />
                    <StatCard 
                        icon={<MessageSquare />} 
                        title="New Messages" 
                        value={data.newMessages} 
                        color="from-green-100 to-green-200" 
                    />
                    <StatCard 
                        icon={<Activity />} 
                        title="Profile Completeness" 
                        value={`${data.profileCompleteness}%`} 
                        color="from-purple-100 to-purple-200" 
                    />
                </div>

                {/* Recent Activity */}
                <section className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-light text-neutral-800 border-b pb-3 mb-6 flex items-center">
                        <Zap className="mr-3 text-neutral-600" />
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        {data.recentActivity.map((activity, index) => (
                            <ActivityItem 
                                key={index} 
                                icon={activity.icon} 
                                message={activity.message} 
                                timestamp={activity.timestamp} 
                            />
                        ))}
                    </div>
                </section>

                {/* Recommended Matches */}
                <section className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center border-b pb-3 mb-6">
            <h2 className="text-2xl font-light text-neutral-800 flex items-center">
                <Target className="mr-3 text-neutral-600" />
                Recommended Matches
            </h2>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    className="p-2 bg-neutral-100 rounded-full disabled:opacity-50"
                >
                    <ChevronLeft />
                </button>
                <span className="text-neutral-600">
                    Page {currentPage} of {Math.ceil(totalMatches / 3)}
                </span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage * 3 >= totalMatches}
                    className="p-2 bg-neutral-100 rounded-full disabled:opacity-50"
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
                    
                    {loading ? (
                        <div className="text-center text-neutral-600">Loading recommendations...</div>
                    ) : error ? (
                        <div className="text-center text-red-600">{error}</div>
                    ) : recommendedMatches.length === 0 ? (
                        <div className="text-center text-neutral-600">
                            No recommended matches found. Try updating your profile or preferences.
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-6">
                            {recommendedMatches.map((match, index) => (
                                <MatchCard key={match.id || index} match={match} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-md hover:shadow-lg transition`}>
      <div className="flex justify-between items-center">
          <div className="bg-white rounded-full p-3 shadow-md">{icon}</div>
          <div className="text-right">
              <p className="text-sm text-neutral-600 uppercase">{title}</p>
              <p className="text-3xl font-light text-neutral-800">{value}</p>
          </div>
      </div>
  </div>
);

const ActivityItem = ({ icon, message, timestamp }) => (
  <div className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition">
      <div className="bg-white rounded-full p-2 shadow-md">{icon}</div>
      <div>
          <p className="text-neutral-700">{message}</p>
          <p className="text-xs text-neutral-500">{timestamp}</p>
      </div>
  </div>
);

const MatchCard = ({ match }) => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-2">
        <img 
            src={match.avatar} 
            alt={match.name} 
            className="w-full h-48 object-cover" 
        />
        <div className="p-4">
            <h3 className="text-xl font-light text-neutral-800">{match.name}</h3>
            <p className="text-sm text-neutral-600">{match.age} • {match.location}</p>
            
            {/* Interests Chip Display */}
            {match.interests && match.interests.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {match.interests.slice(0, 3).map((interest, index) => (
                        <span 
                            key={index} 
                            className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-full"
                        >
                            {interest}
                        </span>
                    ))}
                </div>
            )}
            
            <div className="mt-4 flex items-center space-x-2">
                <div className="flex-1 text-neutral-600 text-sm flex items-center">
                    <Award className="mr-2 text-yellow-500" />
                    Compatibility: {match.compatibility}%
                </div>
                <button className="flex-1 bg-neutral-100 text-neutral-700 py-2 rounded-full hover:bg-neutral-200 transition">
                    View Profile
                </button>
                <button className="flex-1 bg-neutral-800 text-white py-2 rounded-full hover:bg-neutral-700 transition">
                    Connect
                </button>
            </div>
        </div>
    </div>
);

export default Dashboard;
