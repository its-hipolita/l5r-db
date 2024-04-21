import React, { useState } from 'react';
import XMLDisplay from './xmldisplay';
import SearchBar from './searchBar';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLegality, setSelectedLegality] = useState('');

    const handleSearch = (name, legality) => {
        setSearchTerm(name);
        setSelectedLegality(legality);
    };

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <XMLDisplay searchTerm={searchTerm} selectedLegality={selectedLegality} />
        </div>
    );
};

export default Home;