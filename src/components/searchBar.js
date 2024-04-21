import React, { useState } from 'react';
import KeywordSearch from './keywordSearch';
import { Input, Button, Select } from '@mui/joy';
import Option from '@mui/joy/Option';
import cardTypes from '../data/cardTypes';
import clanList from '../data/clanList';
import legalities from '../data/legalities';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [legality, setLegality] = useState('');
    const [cardType, setCardType] = useState('');
    const [clan, setClan] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const action = React.useRef(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchOptions = {
            searchTerm,
            legality,
            type: cardType,
            clan,
            keywords: selectedKeywords // Include selectedKeywords in searchOptions
        };
        console.log(searchOptions);
        onSearch(searchOptions);
    };

    // Callback function to receive selected keywords from KeywordSearch component
    const handleKeywordSearch = (selectedOptions) => {
        // Update the selectedKeywords state with the received selected options
        setSelectedKeywords(selectedOptions);
    };

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSearch} className="mb-4">
                <div className="flex items-center justify-between border-b border-b-2 border-teal-500 py-2">
                    <Input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for a card..."
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                    <Button
                        type="submit"
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Search
                    </Button>
                </div>
            </form>
            <div className="mt-4 p-4 border border-gray-300 rounded">

                <Select
                    value={cardType}
                    onChange={(e, newValue) => setCardType(newValue)}
                    placeholder="All card types"
                    {...(cardType && {
                        // display the button and remove select indicator
                        // when user has selected a value
                        endDecorator: (
                            {/* <IconButton
                                size="sm"
                                variant="plain"
                                color="neutral"
                                onMouseDown={(e) => {
                                    // don't open the popup when clicking on this button
                                    e.stopPropagation();
                                }}
                                onClick={() => {
                                    setCardType('');
                                    action.current?.focusVisible();
                                }}
                            >
                                <CloseRounded />
                            </IconButton> */}
                        ),
                        indicator: null,
                    })}
                >
                    {cardTypes.map((cardType, index) => (
                        <Option key={index} value={cardType}>
                            {cardType}
                        </Option>
                    ))}
                </Select>
                <Select
                    value={legality}
                    onChange={(e, newValue) => setLegality(newValue)}
                    placeholder="All legalities"
                >
                    {legalities.map((legality, index) => (
                        <Option key={index} value={legality}>
                            {legality}
                        </Option>
                    ))}
                </Select>
                <Select
                    value={clan}
                    onChange={(e, newValue) => setClan(newValue)}
                    placeholder="All clans"
                >
                    {clanList.map((clan, index) => (
                        <Option key={index} value={clan}>
                            {clan}
                        </Option>
                    ))}
                </Select>

                <KeywordSearch onSearch={handleKeywordSearch} />
            </div>
        </div>
    );
};

export default SearchBar;