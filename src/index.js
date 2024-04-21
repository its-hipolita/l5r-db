import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import '@fontsource/inter';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

ReactDOM.render(
  
  <CssVarsProvider>
  <CssBaseline />
    <App />
  </CssVarsProvider>,
  document.getElementById('root')
);
