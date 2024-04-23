import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/joy'; // Import Joy UI components
import { ConstructionOutlined } from '@mui/icons-material';

const DeckView = ({ cardUpdate, onClose }) => {
    const [currentDeck, setCurrentDeck] = useState([]);
    const [currentCard, setCurrentCard] = useState({});
    const columns = {
        "Pre-game": [],
        "Dynasty": [],
        "Fate": []
    };

    useEffect(() => {
        console.log(currentDeck);
        setCurrentDeck(prevDeck => {
            // Get the number of cards with the same name in the deck
            const sameNameCardsCount = prevDeck.length > 0 ? prevDeck.filter(card => card.name === cardUpdate.name).length : 0;

            // Find the index of the card being updated in the deck
            const cardIndex = prevDeck.findIndex(card => card.id === cardUpdate.id);

            // If the card is being added, push it to the deck
            if (cardUpdate.isAdded) {
                return [...prevDeck, cardUpdate];
            } else {
                // If the card is being removed
                if (cardIndex !== -1) {
                    // If the count of the card is greater than 1, reduce its count by 1
                    if (sameNameCardsCount > 1) {
                        const updatedDeck = [...prevDeck];
                        updatedDeck.splice(cardIndex, 1); // Remove the card
                        return updatedDeck;
                    } else {
                        // If the count is 1, remove all instances of the card from the deck
                        const updatedDeck = prevDeck.filter(card => card.id !== cardUpdate.id);
                        return updatedDeck;
                    }
                }
            }
            // If the card is not found in the deck, return the previous deck unchanged
            return prevDeck;
        });
    }, [cardUpdate]);



    Object.values(currentDeck).forEach(card => {
        const { name, type } = card;
        if (type === "stronghold" || type === "wind" || type === "sensei") {
            columns["Pre-game"].push(card);
        } else if (type === "personality" || type === "holding" || type === "event") {
            columns["Dynasty"].push(card);
        } else {
            columns["Fate"].push(card);
        }
    });

    return (
        <Box
            position="fixed"
            bottom={0}
            left={0}
            width="100%"
            height="33vh" // Set height to 33% of the viewport height
            bgcolor="#FFFFFF" // Set background color to white or any desired color
            zIndex={9999} // Ensure it appears above other elements
            boxShadow="0px -5px 10px rgba(0, 0, 0, 0.3)" // Add a shadow for better visibility
            p={2}
            borderTopLeftRadius={8}
            borderTopRightRadius={8}
        >
            <Typography variant="h6" gutterBottom>
                Deck Creator View
            </Typography>

            <Stack direction="row" spacing={2}>
                {/* Render each column */}
                {Object.entries(columns).map(([columnTitle, columnCards], columnIndex) => (
                    <Stack key={columnIndex} direction="column" alignItems="left">
                        <Typography variant="subtitle1" gutterBottom>{columnTitle}</Typography>
                        {/* Aggregate counts for cards with the same name */}
                        {Object.entries(aggregateCardCounts(columnCards)).map(([cardName, cardCount], cardIndex) => (
                            <Typography key={cardIndex}>{`${cardCount} ${cardName}`}</Typography>
                        ))}
                    </Stack>
                ))}
            </Stack>
        </Box>
    )};

    // Function to aggregate counts for cards with the same name
    const aggregateCardCounts = (cards) => {
        const counts = {};
        cards.forEach(card => {
            counts[card.name] = (counts[card.name] || 0) + 1;
        });
        return counts;
    };

    export default DeckView;
