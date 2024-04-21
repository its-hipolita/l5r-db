import React, { useState } from 'react';
import XMLDisplay from './xmldisplay';
import SearchBar from './searchBar';

const Home = () => {
    const [searchOptions, setSearchOptions] = useState({});

    const handleSearch = (newSearchOptions) => {
        console.log(newSearchOptions);
        setSearchOptions(newSearchOptions);
    };
    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <XMLDisplay searchOptions={searchOptions} />
        </div>
    );
};

export default Home;