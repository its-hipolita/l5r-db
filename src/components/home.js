import React, { useState } from 'react';
import XMLDisplay from './xmldisplay';
import SearchBar from './searchBar';

const Home = () => {
    const [searchOptions, setSearchOptions] = useState({});

    const handleSearch = (newSearchOptions) => {
        setSearchOptions(newSearchOptions);
    };

    return (
        <div className="flex h-screen">
            {/* Left Sidebar (SearchBar) */}
            <div className="w-1/4 bg-gray-200 p-4">
                <SearchBar onSearch={handleSearch} />
            </div>

            {/* Right Content (Card Gallery) */}
            <div className="w-3/4 p-4 overflow-y-auto">
                <XMLDisplay searchOptions={searchOptions} />
            </div>
        </div>
    );
};

export default Home;
