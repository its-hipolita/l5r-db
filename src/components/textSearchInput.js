import React, { useState } from 'react';
import Input from '@mui/joy/Input';

const TextSearchInput = ({ onSearch }) => {
    const [textSearch, setTextSearch] = useState('');

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSearch = () => {
        onSearch(textSearch);
    };

    return (
        <Input
            value={textSearch}
            onChange={(e) => setTextSearch(e.target.value)}
            placeholder="Search within card text"
            onKeyPress={handleKeyPress}
        />
    );
};

export default TextSearchInput;
