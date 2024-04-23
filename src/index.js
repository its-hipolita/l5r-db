import React, {useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import firebase from 'firebase/compat/app'; // Import Firebase
import 'firebase/compat/auth'; // Import Firebase Authentication module


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8iJFL0sMcuGCtLmCsvGkIL6KPvG3qPAk",
  authDomain: "l5r-onyx-db.firebaseapp.com",
  projectId: "l5r-onyx-db",
  storageBucket: "l5r-onyx-db.appspot.com",
  messagingSenderId: "647132911693",
  appId: "1:647132911693:web:6a2b0dbabfe0fb8e19a404"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
// Set persistence mode

// Render the App component only after Firebase is initialized
const RenderApp = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setFirebaseInitialized(true);
    });
  }, []);

  return firebaseInitialized ? <App /> : null;
};
ReactDOM.render(
  <CssVarsProvider>
    <CssBaseline />
    <RenderApp />
  </CssVarsProvider>,
  document.getElementById('root')
);
