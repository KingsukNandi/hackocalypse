import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Import your main App component


// Import the font from Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Create a root using createRoot
const root = ReactDOM.createRoot(rootElement);

// Render your app inside the root
root.render(
  <Router>
    <App />
  </Router>
);
