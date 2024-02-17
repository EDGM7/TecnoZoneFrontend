import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap
import App from './App';

createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* Envuelve tu App con BrowserRouter */}
    <App />
  </BrowserRouter>
);
