import React, { useEffect, useState } from 'react'
import { useTestMode } from '../context/TestModeContext'
import LineGraphComp from '../Components/LineGraphComp';
import BarGraphComp from '../Components/BarGraphComp';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';
import PieChart from '../Components/PieChart';
import TopperFriendInfo from '../Components/TopperFriendInfo';

const Compare = () => {
    //compare you vs you friend
    const [frDate, setFrDate] = useState([]);
    const [error, setError] = useState("");
    let { curr_user_data } = useTestMode();
    let { theme } = useThemeContext()
    // console.log(curr_user_data)

    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem("frEmail")) {
            let frEmail = sessionStorage.getItem("frEmail")
            getFriendData(frEmail)
        } else {
            //navigate
            navigate('/')
        }
    }, [])


    function getFriendData(frEmail) {
        const q = query(collection(db, "Results"), where("userEmail", '==', frEmail),
            orderBy("timeStamp", "desc"))

        getDocs(q).then((querysnapShot) => {
            let tempfrData = []
            querysnapShot.docs.forEach((doc) => {
                tempfrData.push(doc.data());
            })
            if (tempfrData.length === 0) {
                setError("Email not exist!")
            }
            else if (tempfrData.length < 2) {
                setError("Your friends need to attempt at least 2 test for comparison!")
            }
            if (tempfrData.length >= 2) {
                setFrDate(tempfrData)
                setError("")

            }

        }).catch((e) => {
            console.log(e, e.code)
            setError("some err occured to get friend data");


        })
    }


    // console.log(curr_user_data.map((obj) => obj.wpm),
    //     frDate.map((obj) => obj.wpm));

    if (error) {
        toast.error(error);
        sessionStorage.removeItem("frEmail")
        navigate('/user')
    }

    if (frDate.length === 0 || curr_user_data.length === 0) {
        return <div className='parentOfloader'><CircularProgress size={100} style={{ color: theme.textColor }} /></div>
    }

    return (

        (curr_user_data.length > 0 && frDate.length > 0) &&
        <div className='canvas'>
            <TopperFriendInfo curr_userObj={curr_user_data[0]} topper_ORfriendObj={frDate[0]} vs="Your Friend" />
            <LineGraphComp curr_user_data={curr_user_data} data2={frDate} vs="Your Friend" />
            <BarGraphComp curr_user_data={curr_user_data} data2={frDate} vs="Your Friend" />
            <PieChart curr_user_data={curr_user_data} data2={frDate} vs="Your Friend" />
        </div>

    )
}

export default Compare