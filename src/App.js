import React from 'react';
import { GlobalStyle } from './styles/global';

import { ThemeProvider } from 'styled-components';
import { useThemeContext } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';

function App() {
  const { theme } = useThemeContext()

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <GlobalStyle />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<User />} />

      </Routes>

    </ThemeProvider>

  );
}

export default App;
