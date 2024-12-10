import React from 'react';

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

export default FilterSelect;
