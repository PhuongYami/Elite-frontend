import React from 'react';

const DetailItem = ({ label, value }) => (
    <div>
        <p className="text-xs text-neutral-500 uppercase">{label}</p>
        <p className="text-neutral-800 font-medium">{value || 'Not specified'}</p>
    </div>
);

export default DetailItem;
