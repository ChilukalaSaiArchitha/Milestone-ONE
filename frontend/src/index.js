import React from 'react';
import ReactDOM from 'react-dom/client'; // make sure this line exists
import './index.css';
import App from './App';

// Create root and render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
