import React from 'react';
import { X, Star, Heart } from 'lucide-react';

const ActionButtons = ({ onAction }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            <button 
                onClick={() => onAction('skip')}
                className="bg-red-100 text-red-700 py-3 rounded-full hover:bg-red-200 transition flex items-center justify-center"
            >
                <X size={24} />
            </button>
            <button 
                onClick={() => onAction('superlike')}
                className="bg-purple-100 text-purple-700 py-3 rounded-full hover:bg-purple-200 transition flex items-center justify-center"
            >
                <Star size={24} />
            </button>
            <button 
                onClick={() => onAction('like')}
                className="bg-green-100 text-green-700 py-3 rounded-full hover:bg-green-200 transition flex items-center justify-center"
            >
                <Heart size={24} />
            </button>
        </div>
    );
};

export default ActionButtons;
