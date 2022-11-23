import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./app";
import "bootstrap/dist/js/bootstrap.bundle"; // Bootstrap JS
import "./assets/scss/index.scss"; // Custom CSS

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);