import React, { useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import keywordsArray from '../data/keywordsArray';

const KeywordSearch = ({ onSearch }) => {
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    const handleKeywordChange = (event, selectedOptions) => {
        setSelectedKeywords(selectedOptions);
        onSearch(selectedOptions);
    };

    return (
        <div className="keyword-search">
            <Autocomplete
                multiple
                id="tags-default"
                placeholder="Keywords"
                options={keywordsArray}
                onChange={handleKeywordChange} 
                value={selectedKeywords} 
            />
        </div>
    );
};

export default KeywordSearch;
