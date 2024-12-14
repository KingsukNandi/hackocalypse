import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';

// Import the font from Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
