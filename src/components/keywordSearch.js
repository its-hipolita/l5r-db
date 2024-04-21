import React, { useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import keywordsArray from '../data/keywordsArray'; // Import the keywords array from the file

const KeywordSearch = ({ onSearch }) => {
    // State to store the selected keywords
    const [selectedKeywords, setSelectedKeywords] = useState([]);

    // Function to handle the change in selected keywords
    const handleKeywordChange = (event, selectedOptions) => {
        // Update the selected keywords in the state
        setSelectedKeywords(selectedOptions);
        // Call the onSearch callback function with the selected keywords
        onSearch(selectedOptions);
    };

    return (
        <div className="keyword-search">
            {/* Render Autocomplete component */}
            <Autocomplete
                multiple
                id="tags-default"
                placeholder="Keywords"
                options={keywordsArray}
                onChange={handleKeywordChange} // Call handleKeywordChange function on selection change
                value={selectedKeywords} // Set the selected options
            />
        </div>
    );
};

export default KeywordSearch;
