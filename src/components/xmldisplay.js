import React, { useEffect, useState } from 'react';
import CardGallery from './CardGallery';
import imageList from '../services/imageList.json';
import { Select, Option, Button } from '@mui/joy';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const XMLDisplay = ({ searchOptions }) => {
    const [xmlData, setXmlData] = useState(null);
    const [filteredCards, setFilteredCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(20);

    useEffect(() => {
        if (searchOptions) {
            setLoading(true);
            const fetchXMLData = async () => {
                try {
                    const response = await fetch('/db/database.xml');
                    /* const response = await fetch('/db/dummydata.xml'); */
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
    }, [searchOptions]);

    useEffect(() => {
        if (xmlData && Object.keys(searchOptions).length > 0) {
            const filtered = filterCards(xmlData, searchOptions);
            setFilteredCards(filtered);
            setCurrentPage(1); // Reset to first page when search options change
        }
    }, [searchOptions, xmlData]);

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

    const filterCards = (data, options) => {
        console.log("options to filter");
        console.log(options);

        let dummyKeywords = ["Shugenja"];
        if (data && data.cards && (options.searchTerm || options.legality || options.type || options.clan || dummyKeywords)) {
            const filtered = data.cards.filter(card => {
                let matchesName = true;
                let matchesLegality = true;
                let matchesType = true;
                let matchesClan = true;
                let matchesKeyword = true;
                
                const imageUrlParts = card.image.split('/');
                const imageName = imageUrlParts[imageUrlParts.length - 1];
                const hasImage = imageList.includes(imageName);

                // Check if the card name partially matches the search term
                if (options.searchTerm) {
                    matchesName = card.name.toLowerCase().includes(options.searchTerm.toLowerCase());
                }

                // Check if the card includes the selected legality in its legal properties
                if (options.legality) {
                    matchesLegality = card.legal.includes(options.legality);
                }

                // Check if the card matches the selected type
                if (options.type) {
                    matchesType = card.type === options.type;
                }

                // Check if the card matches the selected type
                if (options.clan) {
                    matchesClan = card.clan === options.clan;
                }
                // Filter based on keywords
                if (options.keywords) {
                    const keywordsInCardText = parseKeywordsFromText(card);
                    if (options.exclusiveSearch) {
                        // Exclusive search: Return cards that match ALL keywords
                        matchesKeyword = options.keywords.every(keyword => keywordsInCardText.includes(keyword));
                    } else {
                        // Inclusive search: Return cards that match ANY keyword
                        matchesKeyword = options.keywords.some(keyword => keywordsInCardText.includes(keyword));
                    }
                }
                /* if (dummyKeywords) {
                    const keywordsInCardText = parseKeywordsFromText(card);
                    matchesKeyword = dummyKeywords.every(keyword => keywordsInCardText.includes(keyword));
                }
             */
                return matchesName && matchesLegality && matchesType && matchesClan && matchesKeyword && hasImage;
            });
            return filtered;
        }
        return [];
    };


    // Function to parse keywords from card text
    // Function to parse keywords from card text
    const parseKeywordsFromText = (card) => {
        const startIndex = 0;
        const endIndex = card.text.indexOf('<br>');
        const isCorrectType = card.type === "personality" || card.type === "item";
        const isLegal = card.legal.includes("onyx") || card.legal.includes("shattered_empire");

        if (isCorrectType && startIndex !== -1 && endIndex !== -1) {
            const keywordsText = card.text.substring(startIndex, endIndex);
            // Remove HTML tags from keywords
            const keywords = keywordsText.replace(/<[^>]+>/g, '').split(/&#8226;|<br>/).map(keyword => keyword.trim());
            return keywords;
        }

        return [];
    };

    // Calculate index of the last card on the current page
    const indexOfLastCard = currentPage * cardsPerPage;
    // Calculate index of the first card on the current page
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    // Get current cards to display on the current page
    const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Render page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredCards.length / cardsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            {loading ? (
                <p>Loading XML data...</p>
            ) : (
                <div>
                    <CardGallery cards={currentCards} />
                    {filteredCards.length > 0 && (
                        <div className="pagination-container flex items-center justify-center mt-4">
                            <div className="flex items-center space-x-6">
                                <Button
                                    disabled={currentPage === 1}
                                    onClick={() => paginate(1)}
                                    variant="text"
                                    size="small"
                                >
                                    <ChevronLeftIcon className="h-5 w-5" />
                                </Button>
                                <Button
                                    disabled={currentPage === 1}
                                    onClick={() => paginate(currentPage - 1)}
                                    variant="text"
                                    size="small"
                                >
                                    Previous
                                </Button>
                                {pageNumbers.map((number) => (
                                    <Button
                                        key={number}
                                        onClick={() => paginate(number)}
                                        variant="text"
                                        size="small"
                                        sx={{
                                            ...(currentPage === number && {
                                                backgroundColor: 'gray.200', // Light gray background for the active page
                                            }),
                                        }}
                                    >
                                        {number}
                                    </Button>
                                ))}

                                <Button
                                    disabled={currentPage === Math.ceil(filteredCards.length / cardsPerPage)}
                                    onClick={() => paginate(currentPage + 1)}
                                    variant="text"
                                    size="small"
                                >
                                    Next
                                </Button>
                                <Button
                                    disabled={currentPage === Math.ceil(filteredCards.length / cardsPerPage)}
                                    onClick={() => paginate(Math.ceil(filteredCards.length / cardsPerPage))}
                                    variant="text"
                                    size="small"
                                >
                                    <ChevronRightIcon className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default XMLDisplay;