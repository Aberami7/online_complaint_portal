import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Suppress specific CSP warning in development (simplified, no regex issues)
if (process.env.NODE_ENV === 'development') {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (
      args[0] &&
      typeof args[0] === 'string' &&
      args[0].includes("Refused to connect to 'http://localhost:5000/.well-known")
    ) {
      return; // ignore this specific CSP warning
    }
    originalConsoleError(...args);
  };
}

// Get root container
const container = document.getElementById('root');
if (!container) {
  throw new Error(
    "Root container not found. Make sure 'public/index.html' has <div id='root'></div>"
  );
}

// Create root and render App
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
