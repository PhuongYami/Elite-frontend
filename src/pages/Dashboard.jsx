import React, { useEffect, useState } from 'react';
import { 
    Activity, Heart, Users, MessageSquare, 
    Zap, TrendingUp, Target, Award, 
    User, Mail, MapPin 
} from 'lucide-react';

// Mock Dashboard Data
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
    recommendedMatches: [
        {
            name: 'Alex Thompson',
            age: 30,
            location: 'New York, USA',
            avatar: 'https://picsum.photos/400',
            compatibility: 87
        },
        {
            name: 'Rachel Kim',
            age: 28,
            location: 'Los Angeles, USA',
            avatar: 'https://picsum.photos/400',
            compatibility: 79
        },
        {
            name: 'Marcus Rodriguez',
            age: 35,
            location: 'Chicago, USA',
            avatar: 'https://picsum.photos/400',
            compatibility: 92
        }
    ]
};

const Dashboard = () => {
    const [data] = useState(mockDashboardData);

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
                    <h2 className="text-2xl font-light text-neutral-800 border-b pb-3 mb-6 flex items-center">
                        <Target className="mr-3 text-neutral-600" />
                        Recommended Matches
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {data.recommendedMatches.map((match, index) => (
                            <MatchCard key={index} match={match} />
                        ))}
                    </div>
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
          <div className="mt-4 flex space-x-2">
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