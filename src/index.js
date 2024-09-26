import React from 'react';
import ReactDOM from 'react-dom/client'; // Import the createRoot from 'react-dom/client'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css'; // Assuming you have some global styles

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// Optional: Measure performance in your app
reportWebVitals();
