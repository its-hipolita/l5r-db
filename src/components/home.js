import React, { useState, useEffect } from 'react';
import XMLDisplay from './xmldisplay';
import SearchBar from './searchBar';
import firebaseApp from '../services/firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import DeckManager from './deckManager';

const Home = () => {
    const [searchOptions, setSearchOptions] = useState({});
    const [user, setUser] = useState(null);
    const [cardUpdate, setCardUpdate] = useState({});


    useEffect(() => {
        const unsubscribe = firebaseApp.auth().onAuthStateChanged(user => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleSearch = (newSearchOptions) => {
        setSearchOptions(newSearchOptions);
    };

    const handleGoogleSignIn = () => {
        const provider = new GoogleAuthProvider();
        firebaseApp.auth().signInWithPopup(provider)
            .then((result) => {
            })
            .catch((error) => {
            });
    };
    const onCardChange = (cardChange, isAdded) => {
        cardChange.isAdded = isAdded;
        setCardUpdate(cardChange);
    };
    return (
        <div className="flex h-screen">
            {/* Left Sidebar (SearchBar) */}
            <div className="w-1/4 bg-gray-200 p-4 relative">
                <SearchBar onSearch={handleSearch} />
{/*                 {user ? (
                    <div>
                        <p>Logged in as {user.displayName}</p>
                    </div>
                ) : (
                    <button onClick={handleGoogleSignIn} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Sign in with Google
                    </button>
                )} */}
            </div>

            {/* Right Content (XMLDisplay with CardGallery) */}
            <div className="w-3/4 p-4 overflow-y-auto">
                {/* Pass necessary props to XMLDisplay */}
                <XMLDisplay searchOptions={searchOptions} user={user} onCardUpdate={onCardChange} />
            </div>

            {/* Deck Manager */}
            <DeckManager cardUpdate={cardUpdate} user={user} />
        </div>
    );
};

export default Home;
