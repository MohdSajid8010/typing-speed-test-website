import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from '../FirebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import getCurrUserData from '../globalFunctions/getCurrUserData';

const TestModeContext = createContext();

export const TestModeContextProvider = (props) => {

    const [testTime, setTestTime] = useState(15);
    const [curr_user_data, setCurr_user_data] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [isDataAdd, setIsDataAdd] = useState(false)//is new data add into firestore then retrive the data again

    // console.log(loading)

    useEffect(() => {
        // console.log(loading, user)

        if (loading === false && user != null) {
            // console.log(loading)

            console.log("get data from firestore and add context")
            getCurrUserData(setCurr_user_data)
        }

    }, [loading, user, isDataAdd])

    return <TestModeContext.Provider value={{ testTime, setTestTime, curr_user_data, setCurr_user_data, isDataAdd, setIsDataAdd }}>
        {props.children}
    </TestModeContext.Provider>
}

export const useTestMode = () => useContext(TestModeContext);






