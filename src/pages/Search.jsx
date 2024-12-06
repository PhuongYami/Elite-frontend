import React, { useState } from "react";
import { Search, Filter, X, Users, MapPin, Heart, Ruler, Award } from "lucide-react";

const AdvancedSearch = () => {
    const [filters, setFilters] = useState({
        gender: "",
        ageRange: "",
        distance: "",
        interests: "",
        height: "",
        relationshipStatus: "",
        location: "",
    });

    const [results, setResults] = useState([]);
    const [isFiltersCollapsed, setFiltersCollapsed] = useState(false);

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const handleSearch = () => {
        // Mock search logic
        const mockResults = [
            {
                id: 1,
                name: "Emma Johnson",
                age: 28,
                gender: "Female",
                location: "San Francisco, USA",
                avatar: "/api/placeholder/400/400",
                interests: ["Travel", "Photography"],
                height: "1.68m",
                relationshipStatus: "Single",
            },
            {
                id: 2,
                name: "Liam Chen",
                age: 32,
                gender: "Male",
                location: "Seattle, USA",
                avatar: "/api/placeholder/400/400",
                interests: ["Tech", "Hiking"],
                height: "1.82m",
                relationshipStatus: "Divorced",
            },
        ];
        setResults(mockResults);
        setFiltersCollapsed(true); // Thu gọn Filters khi nhấn Search
    };

    const handleReset = () => {
        setFilters({
            gender: "",
            ageRange: "",
            distance: "",
            interests: "",
            height: "",
            relationshipStatus: "",
            location: "",
        });
        setResults([]);
        setFiltersCollapsed(false); // Hiển thị lại Filters khi Reset
    };

    return (
        <div className="min-h-screen bg-neutral-50 p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-thin text-neutral-800 mb-8">Advanced Search</h1>

                {/* Filters Section */}
                <div className={`bg-white p-6 rounded-2xl shadow-lg mb-8 transition-all ${isFiltersCollapsed ? "h-16 overflow-hidden" : "h-auto"}`}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-light text-neutral-800 flex items-center">
                            <Filter className="mr-3 text-neutral-600" />
                            Filters
                        </h2>
                        {isFiltersCollapsed && (
                            <button
                                onClick={() => setFiltersCollapsed(false)}
                                className="text-neutral-600 hover:text-neutral-800"
                            >
                                Expand
                            </button>
                        )}
                    </div>

                    {/* Chỉ hiển thị nếu không bị thu gọn */}
                    {!isFiltersCollapsed && (
                        <div>
                            <div className="grid md:grid-cols-3 gap-6 mt-6">
                                <FilterSelect
                                    label="Gender"
                                    options={["Male", "Female", "Other"]}
                                    value={filters.gender}
                                    onChange={(value) => handleFilterChange("gender", value)}
                                />
                                <FilterSelect
                                    label="Age Range"
                                    options={["18-25", "26-35", "36-45", "46-55", "55+"]}
                                    value={filters.ageRange}
                                    onChange={(value) => handleFilterChange("ageRange", value)}
                                />
                                <FilterSelect
                                    label="Distance"
                                    options={["0-10 km", "10-50 km", "50-100 km", "100+ km"]}
                                    value={filters.distance}
                                    onChange={(value) => handleFilterChange("distance", value)}
                                />
                                <FilterSelect
                                    label="Height"
                                    options={["< 1.6m", "1.6m - 1.8m", "> 1.8m"]}
                                    value={filters.height}
                                    onChange={(value) => handleFilterChange("height", value)}
                                />
                                <FilterSelect
                                    label="Relationship Status"
                                    options={["Single", "Married", "Divorced"]}
                                    value={filters.relationshipStatus}
                                    onChange={(value) => handleFilterChange("relationshipStatus", value)}
                                />
                                <FilterInput
                                    label="Location"
                                    value={filters.location}
                                    onChange={(value) => handleFilterChange("location", value)}
                                />
                            </div>
                            <div className="mt-6 flex justify-end space-x-4">
                                <button
                                    onClick={handleReset}
                                    className="text-neutral-600 hover:text-neutral-800"
                                >
                                    Reset
                                </button>
                                <button
                                    onClick={handleSearch}
                                    className="bg-neutral-800 text-white px-6 py-2 rounded-full hover:bg-neutral-700"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results Section */}
                {results.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-light text-neutral-800 mb-6 flex items-center">
                            <Award className="mr-3 text-neutral-600" />
                            Search Results
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {results.map((profile) => (
                                <ProfileCard key={profile.id} profile={profile} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

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

const FilterInput = ({ label, value, onChange }) => (
    <div>
        <label className="text-sm text-neutral-600 block mb-2">{label}</label>
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border border-neutral-200 rounded-lg px-3 py-2 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-300"
        />
    </div>
);

const ProfileCard = ({ profile }) => (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition transform hover:-translate-y-2">
        <img
            src={profile.avatar}
            alt={profile.name}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
            <h3 className="text-xl font-light text-neutral-800">{profile.name}</h3>
            <p className="text-sm text-neutral-600">
                {profile.age} • {profile.location}
            </p>
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

export default AdvancedSearch;
