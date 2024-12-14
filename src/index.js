import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 or later
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App'; // Import your App component

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <BrowserRouter>  {/* Wrap App with BrowserRouter */}
      <App />
    </BrowserRouter>
  );
}
