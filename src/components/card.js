// Card.js

import React from 'react';

const Card = ({ card }) => {
    return (
        <div className="bg-white p-4 rounded-md shadow">
            {/* Card Image */}
            <img src={card.image} alt={card.name} className="mb-2" />

            {/* Card Text */}
            <div className="text-sm">
                <p><strong>Name:</strong> {card.name}</p>
                <p><strong>Edition:</strong> {card.edition}</p>
                {/* Add more card details here */}
            </div>
        </div>
    );
};

export default Card;
