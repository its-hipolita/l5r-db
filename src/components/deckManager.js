import React, { useEffect, useState } from 'react';
import { Box, Button } from '@mui/joy'; // Import Button and Box from MUI
import DeckView from './deckView';

const DeckManager = ({ cardUpdate, user }) => {
    const [newCard, setNewCard] = useState({});
    const [showDeckView, setShowDeckView] = useState(false);

    useEffect(() => {
        setNewCard(cardUpdate);
    }, [cardUpdate]);

    const toggleDeckView = () => {
        setShowDeckView(prevState => !prevState);
    };

    return (
        <>
            {showDeckView && (
                <DeckView cardUpdate={newCard} />
            )}
            <Box position="absolute" bottom={10} right={10} zIndex={9999}>
                <Button
                    variant="contained"
                    color={showDeckView ? "secondary" : "primary"}
                    onClick={toggleDeckView}
                    sx={{ backgroundColor: showDeckView ? '#F44336' : '#4CAF50', '&:hover': { backgroundColor: showDeckView ? '#D32F2F' : '#388E3C' } }}
                >
                    {showDeckView ? "Close deck view" : "Toggle Deck View"}
                </Button>
            </Box>
        </>
    );
};

export default DeckManager;
