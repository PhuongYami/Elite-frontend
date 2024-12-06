import React, { useState } from 'react';
import { 
    Calendar, MapPin, Users, Heart, Star, 
    Filter, TrendingUp, Award, Clock 
} from 'lucide-react';

const mockActivities = [
    {
        id: 1,
        type: 'Match',
        icon: <Heart />,
        title: 'You matched with Emma Johnson',
        details: 'New match! Start a conversation',
        timestamp: '2h ago'
    },
    {
        id: 2,
        type: 'Profile View',
        icon: <TrendingUp />,
        title: 'Profile View Increase',
        details: '+24 profile views this week',
        timestamp: 'Yesterday'
    },
    {
        id: 3,
        type: 'Super Like',
        icon: <Star />,
        title: 'Super Like from Liam Chen',
        details: 'Someone is really interested!',
        timestamp: '3d ago'
    }
];

const mockUpcomingEvents = [
    {
        id: 1,
        title: 'Coffee Date',
        date: 'Jun 15, 2024',
        time: '2:00 PM',
        location: 'Starbucks, Downtown',
        participants: 4
    },
    {
        id: 2,
        title: 'Group Hiking',
        date: 'Jul 20, 2024',
        time: '9:00 AM',
        location: 'Mountain Trail Park',
        participants: 12
    }
];

const Activities = () => {
    const [activeTab, setActiveTab] = useState('all');

    return (
        <div className="min-h-screen bg-neutral-50 p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-thin text-neutral-800 mb-4 sm:mb-0">Activities</h1>
                    <button className="bg-white shadow-md rounded-full p-3 hover:bg-neutral-100 transition">
                        <Filter />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 sm:space-x-4 mb-6 bg-white rounded-full p-2 shadow-md">
                    {['all', 'matches', 'views', 'likes'].map(tab => (
                        <button
                            key={tab}
                            className={`
                                flex-1 py-2 rounded-full capitalize text-xs sm:text-base
                                ${activeTab === tab 
                                    ? 'bg-neutral-800 text-white' 
                                    : 'text-neutral-600 hover:bg-neutral-100'
                                }
                            `}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* All Activities */}
                <section className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
                    <h2 className="text-xl sm:text-2xl font-light text-neutral-800 border-b pb-3 mb-6 flex items-center">
                        <Award className="mr-3 text-neutral-600 w-5 h-5 sm:w-6 sm:h-6" />
                        Recent Activities
                    </h2>
                    <div className="space-y-4">
                        {mockActivities.map(activity => (
                            <ActivityItem key={activity.id} activity={activity} />
                        ))}
                    </div>
                </section>

                {/* Upcoming Events */}
                <section className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-light text-neutral-800 border-b pb-3 mb-6 flex items-center">
                        <Calendar className="mr-3 text-neutral-600 w-5 h-5 sm:w-6 sm:h-6" />
                        Upcoming Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {mockUpcomingEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

const ActivityItem = ({ activity }) => (
    <div className="flex items-center space-x-2 sm:space-x-4 p-3 sm:p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition">
        <div className="bg-white rounded-full p-2 sm:p-3 shadow-md">{activity.icon}</div>
        <div className="flex-1">
            <h3 className="text-sm sm:text-base text-neutral-800 font-medium">{activity.title}</h3>
            <p className="text-xs sm:text-sm text-neutral-600">{activity.details}</p>
        </div>
        <span className="text-[10px] sm:text-xs text-neutral-500">{activity.timestamp}</span>
    </div>
);

const EventCard = ({ event }) => (
    <div className="bg-neutral-100 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-lg sm:text-xl font-light text-neutral-800">{event.title}</h3>
            <div className="flex items-center space-x-2 text-neutral-600">
                <Clock size={16} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm">{event.time}</span>
            </div>
        </div>
        <div className="flex items-center space-x-2 mb-4">
            <MapPin size={16} className="text-neutral-600 w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm text-neutral-700">{event.location}</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between mt-auto space-y-4 sm:space-y-0">
            <div className="flex -space-x-4 mb-2 sm:mb-0">
                {[...Array(event.participants)].map((_, i) => (
                    <img 
                        key={i} 
                        src="/api/placeholder/80/80" 
                        alt={`Participant ${i+1}`} 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                    />
                ))}
            </div>
            <button className="bg-neutral-800 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full hover:bg-neutral-700 transition text-xs sm:text-base">
                Join Event
            </button>
        </div>
    </div>
);

export default Activities;