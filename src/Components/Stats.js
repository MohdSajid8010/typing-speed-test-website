import React, { useEffect } from 'react'
import Graph from './Graph'
import { auth, db } from '../FirebaseConfig';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';

const Stats = ({ wpm, accuracy, corretChar, inCorretChar, missedChar, extraChar, graphData }) => {

    console.log(wpm, accuracy, "corretChar", corretChar,
        "inCorretChar", inCorretChar,
        "missedChar", missedChar,
        "extraChar", extraChar,
        graphData
    )
    let timeSet = new Set();
    let newGraphData = graphData.filter((arr) => {
        if (!timeSet.has(arr[0])) {//if value not contain then add
            timeSet.add(arr[0]);
            return arr;
        }
    })



    function pushDataToDB() {
        const { uid } = auth.currentUser;

        addDoc(collection(db, "Results"), {
            wpm: wpm,
            accuracy: accuracy,
            timeStamp: new Date(),
            corretChar: corretChar,
            inCorretChar: inCorretChar,
            missedChar: missedChar,
            extraChar: extraChar,
            userId: uid,
        }).then((res) => {
            console.log(res);
            console.log("Document written with ID: ", res.id);
            toast.success("user data saved succesfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: {
                    color: "green",
                },
            });
        }).catch((err) => {
            console.log("Error adding document: ", err);
            toast.error("data not saved!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: {
                    color: "red",
                },
            });
        })

    }


    useEffect(() => {
        if (isNaN(accuracy)) {
            toast.error("Invalid Test!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: {
                    color: "red",
                },
            });
        } else if (!auth.currentUser) {
            toast.warn("Login to save results!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: {
                    color: "black",
                },
            });
        } else if (auth.currentUser) {
            pushDataToDB();
        }
    }, [])
    return (
        <div className='stats-box'>
            <div className='left'>
                <div>
                    <div className='title'>WPM:</div>
                    <div className='sub-title'>{wpm}</div>
                </div>
                <div>
                    <div className='title'>Accuracy:</div>
                    <div className='sub-title'>{isNaN(accuracy) ? accuracy : accuracy + " %"}</div>
                </div>
                <div>
                    <div className='title'>Characters:</div>
                    <div className='sub-title'>{corretChar}/{inCorretChar}/{missedChar}/{extraChar} </div>
                </div>
            </div>
            <div className='right'>
                <Graph newGraphData={newGraphData} vsDateOrTime='Time(sec)' />
            </div>
        </div>
    )
}

export default Stats