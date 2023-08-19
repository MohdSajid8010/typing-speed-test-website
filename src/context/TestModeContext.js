import React, { createContext, useContext, useState } from 'react'

const TestModeContext = createContext();

export const TestModeContextProvider = (props) => {

    const [testTime, setTestTime] = useState(5)

    return <TestModeContext.Provider value={{ testTime, setTestTime }}>
        {props.children}
    </TestModeContext.Provider>
}

export const useTestMode = () => useContext(TestModeContext);