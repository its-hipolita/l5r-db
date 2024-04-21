import React from 'react';

const parseKeywordsAndText = (text) => {
    const startIndex = 0;
    const endIndex = text.indexOf('<br>');
    if (startIndex !== -1 && endIndex !== -1) {
        const keywordsText = text.substring(startIndex, endIndex);
        const keywords = keywordsText.split(/&#8226;|<br>/).map(keyword => keyword.trim());
        const remainingText = text.substring(endIndex + 4); // Skip '<br>' and include remaining text

        // Parse keywords and bold them if wrapped in <b> tags
        const parsedKeywords = keywords.map(keyword => {
            if (keyword.startsWith('<b>') && keyword.endsWith('</b>')) {
                return `<strong class="mb-2 text-sm">${keyword.substring(3, keyword.length - 4)}</strong>`;
            }
            return `<span class="mb-2 text-sm">${keyword}</span>`;
        }).join(' • ');

        // Convert remaining text with HTML tags
        let parsedText = remainingText.replace(/<b>/g, '<strong>').replace(/<\/b>/g, '</strong>');
        return { keywords: parsedKeywords, remainingText: parsedText };
    }
    return { keywords: '', remainingText: text };
};

const Card = ({ card }) => {
    const { keywords, remainingText } = parseKeywordsAndText(card.text);

    return (
        <div className="border p-4 rounded-md flex items-center">
            <img src={card.image} alt={card.name} className="w-1/4 h-auto mr-4" />
            <div>
                <h3 className="text-lg font-semibold">{card.name}</h3>
                {/* {card.type && <p className="text-sm">Type: {card.type}</p>}
                {card.clan && <p className="text-sm">Clan: {card.clan}</p>}
                {card.cost && <p className="text-sm">Cost: {card.cost}</p>}
                {card.force && <p className="text-sm">Force: {card.force}</p>}
                {card.chi && <p className="text-sm">Chi: {card.chi}</p>}
                {card.personal_honor && <p className="text-sm">Personal honor: {card.personal_honor}</p>} */}
                {keywords && <div className="my-1" dangerouslySetInnerHTML={{ __html: `<ul>${keywords}</ul>` }} />}
                {remainingText && <p className="text-sm" dangerouslySetInnerHTML={{ __html: remainingText }} />}
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
