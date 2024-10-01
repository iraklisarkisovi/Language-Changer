import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Routes1 from './routes';  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Routes1 /> {/* Use the main routing component here */}
  </React.StrictMode>
);

reportWebVitals();
