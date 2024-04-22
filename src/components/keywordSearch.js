import React, { useState } from 'react';
import { Autocomplete, Switch, Stack } from '@mui/joy'; 
import keywordsArray from '../data/keywordsArray';

const KeywordSearch = ({ onSearch }) => {
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [inclusiveSearch, setInclusiveSearch] = useState(false); 

    const handleKeywordChange = (event, selectedOptions) => {
        setSelectedKeywords(selectedOptions);
        onSearch(selectedOptions, inclusiveSearch);
    };

    const handleToggleChange = () => {
        setInclusiveSearch((prev) => !prev); 
        onSearch(selectedKeywords, inclusiveSearch);
    };

    return (
        <Stack spacing={2}> 
            <Autocomplete
                multiple
                id="tags-default"
                placeholder="Keywords"
                options={keywordsArray}
                onChange={handleKeywordChange} 
                value={selectedKeywords} 
            />
            <Stack direction="row" alignItems="center" spacing={2}> 
                <span>Exclusive Search:</span>
                <Switch
                    checked={!inclusiveSearch} 
                    onChange={handleToggleChange}
                />
            </Stack>
        </Stack>
    );
};

export default KeywordSearch;
