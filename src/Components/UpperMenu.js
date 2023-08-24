import React, { useState } from 'react'
import { useTestMode } from '../context/TestModeContext'

const UpperMenu = ({ countDown, resetFun }) => {
    let { setTestTime } = useTestMode()
    const [activeObj, setActiveObj] = useState({ active: 15 })

    const updateTime = (e) => {
        // console.log(e, e.target.id)
        setTestTime(Number(e.target.id))
        setActiveObj({ active: Number(e.target.id) });
        resetFun()
    }

    return (
        <div className='upper-menu'>
            <div className='counter'>{countDown}</div>

            <div className='modes'>
                <div className={`time-mode ${activeObj.active === 15 ? "active" : ""}`} id={15} onClick={updateTime}>15s</div>
                <div className={`time-mode ${activeObj.active === 30 ? "active" : ""}`} id={30} onClick={updateTime}>30s</div>
                <div className={`time-mode ${activeObj.active === 60 ? "active" : ""}`} id={60} onClick={updateTime} > 60s</div >

            </div >
        </div >
    )
}

export default UpperMenu