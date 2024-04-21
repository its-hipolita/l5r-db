import React, { useState, useEffect } from 'react';
import keywordsArray from '../data/keywordsArray'; // Import the keywords array from the file


const KeywordSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [filteredKeywords, setFilteredKeywords] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (searchTerm.trim() !== '') {
            const filtered = keywordsArray.filter(keyword =>
                keyword.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredKeywords(filtered);
            setActiveIndex(-1); // Reset active index when filtering changes
        } else {
            setFilteredKeywords([]);
            setActiveIndex(-1);
        }
    }, [searchTerm]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (activeIndex !== -1) {
                const selectedKeyword = filteredKeywords[activeIndex];
                addSelectedKeyword(selectedKeyword);
            } else if (searchTerm !== '') {
                addSelectedKeyword(searchTerm);
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : filteredKeywords.length - 1));
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex(prevIndex => (prevIndex < filteredKeywords.length - 1 ? prevIndex + 1 : 0));
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        setIsOpen(true);
    };

    const addSelectedKeyword = (keyword) => {
        setSelectedKeywords(prevKeywords => [...prevKeywords, keyword]);
        setSearchTerm('');
        setActiveIndex(-1); // Reset active index after selecting a keyword
        setIsOpen(false);
    };

    const removeSelectedKeyword = (index) => {
        setSelectedKeywords(prevKeywords =>
            prevKeywords.filter((_, i) => i !== index)
        );
    };

    const handleClear = () => {
        setSelectedKeywords([]);
    };

    return (
        <div className="keyword-search">
            <div className="selected-keywords">
                {selectedKeywords.map((keyword, index) => (
                    <div key={index} className="selected-keyword">
                        {keyword}
                        <button onClick={() => removeSelectedKeyword(index)}>
                            &#x2715;
                        </button>
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                placeholder="Type a keyword..."
            />
            {isOpen && searchTerm.trim() !== '' && (
                <ul className="suggested-keywords">
                    {filteredKeywords.map((keyword, index) => (
                        <li
                            key={index}
                            className={index === activeIndex ? 'active' : ''}
                            onClick={() => addSelectedKeyword(keyword)}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            {keyword}
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={handleClear}>Clear All</button>
            <button onClick={() => onSearch(selectedKeywords)}>Apply Filters</button>
        </div>
    );
};

export default KeywordSearch;