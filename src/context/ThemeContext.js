import React, { createContext, useContext, useState } from 'react'
import { themeOptions } from '../utils/themeOptions';

const ThemeContext = createContext();

export const ThemeContextprovider = (props) => {
    let themeDefault = JSON.parse(localStorage.getItem("theme")) || themeOptions[0].value;
    const [theme, setTheme] = useState(themeDefault);//theme object set

    return <ThemeContext.Provider value={{ theme, setTheme }}>
        {props.children}
    </ThemeContext.Provider>
}


export const useThemeContext = () => useContext(ThemeContext);