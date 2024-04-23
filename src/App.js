import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './components/home';

// Import Firebase
import firebaseApp from './services/firebase';

const App = () => {
  return (
      <Homepage />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
