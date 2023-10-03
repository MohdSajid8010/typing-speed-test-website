import React, { useState } from 'react'
import { useTestMode } from '../context/TestModeContext'
import Select from 'react-select';
import { useThemeContext } from '../context/ThemeContext';

const LevelOptions = [{ label: "Easy", value: "easy" }, { label: "Medium", value: "medium" }, { label: "Hard", value: "hard" }];

const UpperMenu = ({ countDown, resetFun, generate_easy_word, generate_medium_word, generate_hard_word }) => {
    let { setTestTime } = useTestMode();
    let { theme } = useThemeContext();

    const [activeObj, setActiveObj] = useState({ active: 15 })
    const [level, setLevel] = useState(LevelOptions[0])

    const updateTime = (e) => {
        // console.log(e, e.target.id)
        setTestTime(Number(e.target.id))
        setActiveObj({ active: Number(e.target.id) });
        resetFun()
        setLevel(LevelOptions[0]);
    }
    
    function handleLevelChange(obj) {
        // console.log(obj)
        if (obj.value === "easy") {
            generate_easy_word()
            setLevel(LevelOptions[0])
        } else if (obj.value === "medium") {
            generate_medium_word()
            setLevel(LevelOptions[1])
        } else if (obj.value === "hard") {
            generate_hard_word()
            setLevel(LevelOptions[2])
        }
    }

    return (
        <div className='upper-menu'>
            <div className='counter'>{countDown}</div>

            <Select
                options={LevelOptions}
                onChange={handleLevelChange}
                value={level}
                placeholder="Level"
                menuPlacement='top'
                autoFocus={true}
                styles={{
                    control: (baseStyles) => { return { ...baseStyles, width: '130px', backgroundColor: theme.background, border: `1px solid ${theme.textColor}` } },
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

            <div className='modes'>
                <div className={`time-mode ${activeObj.active === 15 ? "active" : ""}`} id={15} onClick={updateTime}>15s</div>
                <div className={`time-mode ${activeObj.active === 30 ? "active" : ""}`} id={30} onClick={updateTime}>30s</div>
                <div className={`time-mode ${activeObj.active === 60 ? "active" : ""}`} id={60} onClick={updateTime} > 60s</div >

            </div >
        </div >
    )
}

export default UpperMenu