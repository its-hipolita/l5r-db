import React, { useEffect, useState } from 'react';
import CardGallery from './CardGallery';
import imageList from '../services/imageList.json';

const XMLDisplay = ({ searchTerm, selectedLegality }) => {
    const [xmlData, setXmlData] = useState(null);
    const [filteredCards, setFilteredCards] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchTerm) {
            setLoading(true);
            const fetchXMLData = async () => {
                try {
                    const response = await fetch('/db/database.xml');
                    const text = await response.text();
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(text, 'text/xml');
                    const jsonData = xmlToJson(xmlDoc);
                    setXmlData(jsonData);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching or parsing XML data:', error);
                    setLoading(false);
                }
            };

            fetchXMLData();
        }
    }, [searchTerm]);

    useEffect(() => {
        if (xmlData && searchTerm) {
            const filtered = filterCardsByName(xmlData, searchTerm, selectedLegality);
            setFilteredCards(filtered);
        }
    }, [searchTerm, selectedLegality, xmlData]);

    const xmlToJson = (xml) => {
        const json = {
            cards: []
        };

        const cardNodes = xml.querySelectorAll('card');
        cardNodes.forEach((cardNode) => {
            const edition = cardNode.querySelector('edition')?.textContent || '';
            // Array of allowed editions
            const allowedEditions = ['AM', 'AMoH', 'CRI', 'EP', 'GoC', 'GS', 'HFW', 'Ivory', 'Onyx', 'Promo', 'RoJ', 'ROU', 'RtR', 'SCW', 'TBS', 'TCW', 'ThA', 'TwentyFestivals'];
            // Check if the card's edition is in the allowed editions array
            if (allowedEditions.includes(edition)) {
                const card = {
                    id: cardNode.getAttribute('id'),
                    type: cardNode.getAttribute('type'),
                    name: cardNode.querySelector('name')?.textContent || '',
                    rarity: cardNode.querySelector('rarity')?.textContent || '',
                    edition: edition,
                    image: cardNode.querySelector('image')?.textContent || '',
                    legal: [],
                    text: cardNode.querySelector('text')?.textContent || '',
                    cost: cardNode.querySelector('cost')?.textContent || null,
                    focus: cardNode.querySelector('focus')?.textContent || null,
                    clan: cardNode.querySelector('clan')?.textContent || null,
                    force: cardNode.querySelector('force')?.textContent || null,
                    chi: cardNode.querySelector('chi')?.textContent || null,
                    personal_honor: cardNode.querySelector('personal_honor')?.textContent || null,
                    honor_req: cardNode.querySelector('honor_req')?.textContent || null,
                };

                cardNode.querySelectorAll('legal').forEach((legalNode) => {
                    card.legal.push(legalNode.textContent);
                });

                json.cards.push(card);
            }
        });

        return json;
    };

    const filterCardsByName = (data, name, legality) => {
        console.log(legality);
        if (data && data.cards && (name || legality)) {
            const filtered = data.cards.filter(card => {
                let matchesName = true;
                let matchesLegality = true;

                // Extract filename from the end of the image URL
                const imageUrlParts = card.image.split('/');
                const imageName = imageUrlParts[imageUrlParts.length - 1];
                const hasImage = imageList.includes(imageName);
                if (!hasImage) {
                } else {

                    // Check if the card name partially matches the search term
                    if (name) {
                        matchesName = card.name.toLowerCase().includes(name.toLowerCase());
                        if (matchesName) {                
                            console.log("name match");
                        }
                    }

                    // Check if the card includes the selected legality in its legal properties
                    if (legality) {
                        matchesLegality = card.legal.includes(legality);
                    }

                }


                return matchesName && matchesLegality && hasImage;
            });
            return filtered;
        }
        return [];
    };



    return (
        <div>
            {loading ? (
                <p>Loading XML data...</p>
            ) : (
                <div>
                    {filteredCards.length > 0 ? (
                        <CardGallery cards={filteredCards} />
                    ) : (
                        <p>{searchTerm ? 'No matching cards found.' : 'Enter a search term to find cards.'}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default XMLDisplay;
