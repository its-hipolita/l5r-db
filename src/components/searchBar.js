import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLegality, setSelectedLegality] = useState('');
    const [selectedCardType, setSelectedCardType] = useState('');
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleLegalityChange = (e) => {
        setSelectedLegality(e.target.value);
    };

    const handleCardTypeChange = (e) => {
        setSelectedCardType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm, selectedLegality, selectedCardType);
    };

    const toggleAdvancedSearch = () => {
        setShowAdvancedSearch(!showAdvancedSearch);
    };

    const legalitiesList = [
        "20F",
        "celestial",
        "diamond",
        "emperor",
        "gold",
        "ivory",
        "jade",
        "lotus",
        "onyx",
        "open",
        "samurai",
        "shattered_empire"
    ];

    const cardTypeList = [
        "strategy",
        "region",
        "holding",
        "personality",
        "event",
        "sensei",
        "item",
        "spell",
        "follower",
        "ancestor",
        "stronghold",
        "wind",
        "ring",
        "celestial"
    ];

    return (
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        placeholder="Search for a card..."
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                    <button
                        type="submit"
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                    >
                        Search
                    </button>
                </div>
            </form>
            <button
                onClick={toggleAdvancedSearch}
                className="text-sm text-teal-500 hover:text-teal-700 focus:outline-none"
            >
                Advanced Search
            </button>
            {showAdvancedSearch && (
                <div className="mt-4 p-4 border border-gray-300 rounded">
                    <label className="block mb-2">
                        Legalities:
                        <select 
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedLegality}
                            onChange={handleLegalityChange}
                        >
                            <option value="" disabled>Select a legality</option>
                            {legalitiesList.map((legality, index) => (
                                <option key={index} value={legality}>{legality}</option>
                            ))}
                        </select>
                    </label>
                    <label className="block mb-2">
                        Card Types:
                        <select 
                            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedCardType}
                            onChange={handleCardTypeChange}
                        >
                            <option value="" disabled>Select a card type</option>
                            {cardTypeList.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </label>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
