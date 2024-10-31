import React from 'react';
import ReactDOM from 'react-dom/client'; // Importez 'react-dom/client' au lieu de 'react-dom'
import App from './App';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Créez un root avec 'createRoot'
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
