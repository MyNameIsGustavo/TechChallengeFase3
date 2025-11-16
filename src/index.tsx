import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChronosRotas } from './rotas/rotas';

const root = ReactDOM.createRoot( document.getElementById('root') as HTMLElement );

root.render(
  <React.StrictMode>
    <ChronosRotas />
  </React.StrictMode>
);