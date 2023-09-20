import React from 'react'
import Select from 'react-select';
import { themeOptions } from '../utils/themeOptions';
import { useThemeContext } from '../context/ThemeContext';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { NavLink } from 'react-router-dom';

const Footer = () => {
    const { theme, setTheme } = useThemeContext()

    function handleChange(e) {
        // console.log(e, e.value)
        setTheme(e.value);//update theme, object
        localStorage.setItem("theme", JSON.stringify(e.value))
    }
    return (
        <div className='footer'>
            <div className='links'>
                <NavLink to='https://www.linkedin.com/in/mohdsajid8010/' target='_blanck'><LinkedInIcon className='icons' /></NavLink>
                <NavLink to='https://github.com/MohdSajid8010' target='_blanck'><GitHubIcon className='icons' /></NavLink>

            </div>

            <div className='theme-btn'>
                <Select
                    options={themeOptions}
                    onChange={handleChange}
                    // defaultValue={themeOptions[2]}
                    placeholder="Theme"
                    menuPlacement='top'
                    autoFocus={true}
                    styles={{
                        control: (baseStyles) => { return { ...baseStyles, width: '140px', backgroundColor: theme.background, } },
                        menu: (baseStyles) => { return { ...baseStyles, background: theme.background, border: `1px solid ${theme.textColor}` } },
                        option: (baseStyles, state) => {
                            return {
                                ...baseStyles,
                                backgroundColor: state.isFocused ? theme.typeBoxTextColor : theme.background,
                                color: theme.textColor,
                                cursor: "pointer",
                            }
                        },
                        placeholder: (baseStyles) => {
                            return { ...baseStyles, color: `${theme.textColor}` };
                        },
                        singleValue: (baseStyles) => {
                            return { ...baseStyles, color: `${theme.textColor}` }
                        }

                    }}
                />
            </div>
        </div>
    )
}

export default Footer