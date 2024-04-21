import React from 'react';

const Card = ({ card }) => {
    return (
        <div className="border p-4 rounded-md flex items-center">
            <img src={card.image} alt={card.name} className="w-1/4 h-auto mr-4" />
            <div>
                <h3 className="text-lg font-semibold">{card.name}</h3>
                <p>Type: {card.type}</p>
                <p>Rarity: {card.rarity}</p>
                <p>Edition: {card.edition}</p>
                {/* Add more card properties as needed */}
            </div>
        </div>
    );
};

const CardGallery = ({ cards }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((card, index) => (
                <Card key={index} card={card} />
            ))}
        </div>
    );
};

export default CardGallery;
