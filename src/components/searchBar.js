import React, { useState } from 'react';
import CustomSelect from './customSelect';
import KeywordSearch from './keywordSearch';
import { Input, Button, Stack } from '@mui/joy'; // Import Stack from Joy UI

import cardTypes from '../data/cardTypes';
import clanList from '../data/clanList';
import legalities from '../data/legalities';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [legality, setLegality] = useState('');
    const [cardType, setCardType] = useState('');
    const [clan, setClan] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [andOrSearch, setAndOrSearch] = useState([false]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchOptions = {
            searchTerm,
            legality,
            type: cardType,
            clan,
            keywords: selectedKeywords,
            exclusiveSearch: andOrSearch
        };
        onSearch(searchOptions);
    };

    const handleKeywordSearch = (selectedOptions, andOrSearch) => {
        setSelectedKeywords(selectedOptions);
        setAndOrSearch(andOrSearch);
    };

    return (
        <Stack className="max-w-md mx-auto" spacing={4}> {/* Use Stack instead of Box */}
            <form onSubmit={handleSearch} className="mb-4">
                <Stack direction="row" alignItems="center" justifyContent="space-between" borderBottom="2px solid teal" py={2}>
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
                </Stack>
            </form>
            <Stack spacing={2} p={2}>
                <CustomSelect
                    value={cardType}
                    onChange={setCardType}
                    placeholder="All card types"
                    options={cardTypes}
                    clearValue={() => setCardType('')}
                />
                <CustomSelect
                    value={legality}
                    onChange={setLegality}
                    placeholder="All legalities"
                    options={legalities}
                    clearValue={() => setLegality('')}
                />
                <CustomSelect
                    value={clan}
                    onChange={setClan}
                    placeholder="All clans"
                    options={clanList}
                    clearValue={() => setClan('')}
                />
                <KeywordSearch onSearch={handleKeywordSearch} />
            </Stack>
        </Stack>
    );
};

export default SearchBar;
