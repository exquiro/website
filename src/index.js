import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './main/App';
import {ThemeProvider, CSSReset} from '@chakra-ui/core'
import 'typeface-lato';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <CSSReset />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);