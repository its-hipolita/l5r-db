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
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;