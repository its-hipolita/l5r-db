// App.js or index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from './components/home';
import { extendTheme, Palette, styled } from '@mui/joy/styles';

const App = () => {
  return (
      <Homepage />
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

export default App;