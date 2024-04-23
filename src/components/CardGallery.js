import React, { useState } from 'react';
import { Box } from '@mui/joy';
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import DeckView from './deckView';

const parseKeywordsAndText = (text) => {
    const startIndex = 0;
    const endIndex = text.indexOf('<br>');
    if (startIndex !== -1 && endIndex !== -1) {
        const keywordsText = text.substring(startIndex, endIndex);
        const keywords = keywordsText.split(/&#8226;|<br>/).map(keyword => keyword.trim());
        const remainingText = text.substring(endIndex + 4);

        const parsedKeywords = keywords.map(keyword => {
            if (keyword.startsWith('<b>') && keyword.endsWith('</b>')) {
                return `<strong class="mb-2 text-sm">${keyword.substring(3, keyword.length - 4)}</strong>`;
            }
            return `<span class="mb-2 text-sm">${keyword}</span>`;
        }).join(' • ');

        let parsedText = remainingText.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>');
        return { keywords: parsedKeywords, remainingText: parsedText };
    }
    return { keywords: '', remainingText: text };
};

const Card = ({ card, onAddCard, onRemoveCard }) => {
    const { keywords, remainingText } = parseKeywordsAndText(card.text);

    const handleAddClick = () => {
        // Generate a random identifier for the card
        const randomIdentifier = Math.random().toString(36).substring(7);
        onAddCard({ ...card, identifier: randomIdentifier }); // Notify parent component about the card addition
    };

    const handleRemoveClick = () => {
        const randomIdentifier = Math.random().toString(36).substring(7);
        onRemoveCard({ ...card, identifier: randomIdentifier }); // Notify parent component about the card removal
    };

    return (
        <div className="border p-4 rounded-md flex items-center relative">
            <img src={card.image} alt={card.name} className="w-1/4 h-auto mr-4" />
            <div>
                <h3 className="text-lg font-semibold">{card.name}</h3>
                {keywords && <div className="my-1" dangerouslySetInnerHTML={{ __html: `<ul>${keywords}</ul>` }} />}
                {remainingText && <p className="text-sm" dangerouslySetInnerHTML={{ __html: remainingText }} />}
            </div>
            <Box className="absolute bottom-2 right-2 text-blue-500 cursor-pointer z-10" backgroundColor="white">
                <PlusCircleIcon className="h-6 w-6" onClick={handleAddClick} />
                <MinusCircleIcon className="h-6 w-6" onClick={handleRemoveClick} />
            </Box>
        </div>
    );
};

const CardGallery = ({ cards, user, onCardChange }) => {
    const [showDeckView, setShowDeckView] = useState(false);

    const toggleDeckView = () => {
        setShowDeckView(!showDeckView);
    };

    const handleAddCard = (card) => {
        onCardChange(card, true); // Notify parent component about the card addition
    };
    
    const handleRemoveCard = (card) => {
        onCardChange(card, false); // Notify parent component about the card removal
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
            {cards.map((card, index) => (
                <Card key={index} card={card} onAddCard={handleAddCard} onRemoveCard={handleRemoveCard} />
            ))}
        </div>
    );
};

export default CardGallery;
