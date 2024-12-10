import React, { useState } from 'react'; // Thêm `useState`
import FilterSelect from './FilterSelect'; // Import `FilterSelect`

const DiscoverFilters = ({ onApply }) => {
    const [filters, setFilters] = useState({
        ageRange: '',
        distance: '',
        interests: ''
    });

    const handleFilterChange = (filter, value) => {
        setFilters((prev) => ({
            ...prev,
            [filter]: value,
        }));
    };

    const applyFilters = () => onApply(filters);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-light text-neutral-800 border-b pb-3 mb-4">Filters</h3>
            <div className="grid md:grid-cols-3 gap-4">
                <FilterSelect
                    label="Age Range"
                    options={['18-25', '26-35', '36-45', '46-55', '55+']}
                    value={filters.ageRange}
                    onChange={(value) => handleFilterChange('ageRange', value)}
                />
                <FilterSelect
                    label="Distance"
                    options={['0-10 km', '10-50 km', '50-100 km', '100+ km']}
                    value={filters.distance}
                    onChange={(value) => handleFilterChange('distance', value)}
                />
                <FilterSelect
                    label="Interests"
                    options={['Travel', 'Music', 'Sports', 'Reading', 'Technology']}
                    value={filters.interests}
                    onChange={(value) => handleFilterChange('interests', value)}
                />
            </div>
            <div className="mt-6 flex justify-end space-x-4">
                <button
                    onClick={() => setFilters({ ageRange: '', distance: '', interests: '' })}
                    className="text-neutral-600 hover:text-neutral-800"
                >
                    Reset
                </button>
                <button
                    onClick={applyFilters}
                    className="bg-neutral-800 text-white px-6 py-2 rounded-full hover:bg-neutral-700"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default DiscoverFilters; // Đảm bảo xuất mặc định
