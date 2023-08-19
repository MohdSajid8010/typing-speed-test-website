import React from 'react'
import Select from 'react-select';
import { themeOptions } from '../utils/themeOptions';
import { useThemeContext } from '../context/ThemeContext';

const Footer = () => {
    const { theme, setTheme } = useThemeContext()

    function handleChange(e) {
        console.log(e, e.value)
        setTheme(e.value);
        localStorage.setItem("theme", JSON.stringify(e.value))
    }
    return (
        <div className='footer'>
            <div className='links'>links</div>

            <div className='theme-btn'>
                <Select
                    options={themeOptions}
                    onChange={handleChange}
                    placeholder="Theme"
                    menuPlacement='top'
                    autoFocus={true}
                    styles={{
                        control: (baseStyles) => { return { ...baseStyles, backgroundColor: theme.background, } },
                        menu: (baseStyles) => { return { ...baseStyles, background: theme.background } },
                        option: (baseStyles, state) => {
                            return {
                                ...baseStyles,
                                backgroundColor: state.isFocused ? theme.typeBoxTextColor : theme.background,
                                color: theme.textColor,
                                cursor: "pointer",
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default Footer