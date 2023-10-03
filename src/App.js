import React from 'react';
import { GlobalStyle } from './styles/global';

import { ThemeProvider } from 'styled-components';
import { useThemeContext } from './context/ThemeContext';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import Compare from './pages/Compare';
import Topper from './pages/Topper';

function App() {
  const { theme } = useThemeContext()
console.log("is render")
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <GlobalStyle />
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<User />} />
        <Route path='/compare' element={<Compare />} />
        <Route path='/topper' element={<Topper />} />


      </Routes>

    </ThemeProvider>

  );
}

export default App;
