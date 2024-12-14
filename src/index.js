import React from 'react';
import ReactDOM from 'react-dom/client'; // Use `react-dom/client` for React 18
import App from './App';

// Select the root DOM node
const rootElement = document.getElementById('root');

// Create a root
const root = ReactDOM.createRoot(rootElement);

// Render your app
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
