// App.js or index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './components/home';


const App = () => {
  return (
      <Homepage />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;