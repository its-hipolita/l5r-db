import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/joy'; // Import Typography from Joy UI
import firebase from 'firebase/compat/app'; // Import Firebase
import 'firebase/compat/auth'; // Import Firebase Authentication module

const GoogleSignInButton = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
            if (user) {
                setUserName(user.displayName || 'Unknown');
            } else {
                setUserName('');
            }
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts
    }, []);

    const handleSignInOut = () => {
        if (isSignedIn) {
            firebase.auth().signOut();
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider);
        }
    };

    return (
        <>
            <Button onClick={handleSignInOut} variant="contained">
                {isSignedIn ? 'Sign Out' : 'Sign In with Google'}
            </Button>
            {isSignedIn && (
                <Typography variant="body2" mt={1}>
                    Signed in as {userName}
                </Typography>
            )}
        </>
    );
};

export default GoogleSignInButton;
