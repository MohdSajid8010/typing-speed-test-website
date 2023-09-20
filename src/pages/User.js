import React, { useEffect, useState } from 'react'
import { auth, db } from '../FirebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress } from '@mui/material';
import Graph from '../Components/Graph';
import UserDataTable from '../Components/UserDataTable';
import UserInfo from '../Components/UserInfo';
import { useThemeContext } from '../context/ThemeContext';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

const User = () => {
    const [data, setData] = useState("");
    const [user, loading] = useAuthState(auth)
    const [graphData, setGraphData] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    let { theme } = useThemeContext()
    let navigate = useNavigate();

    //read user data from firestore 

    function getUserData() {

        const { uid } = auth.currentUser;
        console.log("uid=", uid)

        const q = query(collection(db, "Results"), where("userId", "==", uid), orderBy("timeStamp", "desc"));

        getDocs(q).then((snapshot) => {
            console.log(snapshot, snapshot.docs);

            let tempData = []
            let tempGraphData = []

            snapshot.docs.forEach((doc) => {
                tempData.push({ ...doc.data() })
                tempGraphData.push([doc.data().timeStamp.toDate().toLocaleString().split(',')[0],
                doc.data().wpm,
                doc.data().accuracy])


            })
            setData(tempData);
            setGraphData(tempGraphData);
            setDataLoading(false)

        }).catch((err) => {
            console.log(err);

        })
    }


    useEffect(() => {
        if (!loading && !auth) {

            console.log("use not exist")
            navigate('/');
        }
        if (!loading) {

            getUserData();

        }


    }, [loading])


    if (loading || dataLoading) {
        return <div className='parentOfloader'><CircularProgress size={100} style={{ color: theme.textColor }} /></div>
    }

    return (


        <div className='canvas'>

            <UserInfo data={data} />
            <div className='user-info-graph'><Graph newGraphData={graphData} vsDateOrTime='Date' /></div>
            <UserDataTable data={data} />
        </div>
    )
}

export default User