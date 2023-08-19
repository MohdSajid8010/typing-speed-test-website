import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TestModeContextProvider } from './context/TestModeContext';
import { ThemeContextprovider } from './context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ThemeContextprovider>
    <TestModeContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TestModeContextProvider>
  </ThemeContextprovider>


  // </React.StrictMode>
);
