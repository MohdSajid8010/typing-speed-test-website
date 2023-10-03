import React, { useEffect, useState } from 'react'
import { useTestMode } from '../context/TestModeContext'
import { collection, getCountFromServer, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import { db } from '../FirebaseConfig'
import { toast } from 'react-toastify'
import LineGraphComp from '../Components/LineGraphComp'
import BarGraphComp from '../Components/BarGraphComp'
import { CircularProgress } from '@mui/material'
import { useThemeContext } from '../context/ThemeContext'
import PieChart from '../Components/PieChart'
import { useNavigate } from 'react-router-dom'
import TopperFriendInfo from '../Components/TopperFriendInfo'

const Topper = () => {
    //compare you vs topper
    const [topperData, setTopperDate] = useState([]);
    let { curr_user_data } = useTestMode();
    let { theme } = useThemeContext();
    let navigate = useNavigate();
    console.log(curr_user_data);


    useEffect(() => {
        getTopperData()
    }, [])


    function getTopperData() {
        //step 1- get Topper /Email from fire store
        const q = query(collection(db, "Results"), orderBy("wpm", "desc"), limit(1));
        getDocs(q).then((querysnapshot) => {
            let topperEmail = []
            querysnapshot.docs.forEach((doc) => {
                topperEmail.push(doc.data());
            })
            console.log("topper email", topperEmail[0].userEmail)

            //get data of topper
            const q2 = query(collection(db, "Results"), where("userEmail", '==', topperEmail[0].userEmail),
                orderBy("timeStamp", "desc"));

            return getDocs(q2);
        }).then((querysnapshot) => {
            let tempTopperDate = [];
            querysnapshot.docs.forEach((doc) => {
                tempTopperDate.push(doc.data());

            })
            // console.log("topper data", tempTopperDate.map((obj) => (obj.wpm)))
            setTopperDate(tempTopperDate)
        }).catch((e) => {
            console.log(e, e.code);
            toast.error("something went wrong to get topper data!");
            navigate("/user")
        })
    }


    if (topperData.length === 0 || curr_user_data.length === 0) {
        return <div className='parentOfloader'><CircularProgress size={100} style={{ color: theme.textColor }} /></div>

    }
    return (
        <div>
            {(topperData.length > 0 && curr_user_data.length > 0) &&
                <div className='canvas'>
                    <TopperFriendInfo curr_userObj={curr_user_data[0]} topper_ORfriendObj={topperData[0]} vs="Topper" />
                    <LineGraphComp curr_user_data={curr_user_data} data2={topperData} vs="Topper" />
                    <BarGraphComp curr_user_data={curr_user_data} data2={topperData} vs="Topper" />
                    <PieChart curr_user_data={curr_user_data} data2={topperData} vs="Topper" />
                </div>
            }
        </div>
    )
}

export default Topper