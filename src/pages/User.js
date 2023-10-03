import React, { useEffect, useState } from 'react'
import { auth, } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress } from '@mui/material';
import Graph from '../Components/Graph';
import UserDataTable from '../Components/UserDataTable';
import UserInfo from '../Components/UserInfo';
import { useThemeContext } from '../context/ThemeContext';
import UseInofUpperComp from '../Components/UseInofUpperComp';
import { useTestMode } from '../context/TestModeContext';

const User = () => {
    const [data, setData] = useState([]);
    const [user, loading] = useAuthState(auth)
    const [graphData, setGraphData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    let { theme } = useThemeContext()
    let { curr_user_data } = useTestMode()
    console.log(curr_user_data)
    let navigate = useNavigate();

    function getUserData() {
        let tempGraphData = [];
        curr_user_data.forEach((obj) => {
            tempGraphData.push([obj.timeStamp.toDate().toLocaleString().split(','),
            obj.wpm,
            obj.accuracy])
        })
        // toLocaleTimeString toLocaleDateString
        setData(curr_user_data);
        setGraphData(tempGraphData);
        setDataLoading(false)
    }

    useEffect(() => {
        if (!loading && !auth) {

            console.log("user not exist")
            navigate('/');
        }
        if (!loading) {
            getUserData();
        }

    }, [loading, curr_user_data.length])


    if (loading || dataLoading) {
        return <div className='parentOfloader'><CircularProgress size={100} style={{ color: theme.textColor }} /></div>
    }
    console.log(curr_user_data)
    return (


        <div className='canvas'>

            <UseInofUpperComp />
            <UserInfo data={data} />
            <div className='user-info-graph'><Graph newGraphData={graphData} vsDateOrTime='Date' /></div>
            <UserDataTable data={data} />
        </div>
    )
}

export default User