import React, { useEffect } from 'react'
import Graph from './Graph'
import { auth, db } from '../FirebaseConfig';
import { toast } from 'react-toastify';

const Stats = ({ wpm, accuracy, corretChar, inCorretChar, missedChar, extraChar, graphData }) => {

    console.log(wpm, accuracy, corretChar,
        inCorretChar,
        missedChar,
        extraChar,
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

        if (isNaN(accuracy)) {
            toast.error("Invalid Test!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        let resultsRef = db.collection('Results');

        const { uid } = auth.currentUser;
        console.log(auth, resultsRef)
        resultsRef.add({
            wpm: wpm,
            accuracy: accuracy,
            timeStamp: new Date(),
            // characters: `${corretChar / inCorretChar / missedChar / extraChar}`,
            corretChar: corretChar,
            inCorretChar: inCorretChar,
            missedChar: missedChar,
            extraChar: extraChar,
            userId: uid,
        }).then((res) => {
            console.log(res);
            toast.success("user data saved succesfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }).catch((err) => {
            console.log(err);
            toast.error("data not saved!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        })

    }

    useEffect(() => {
        if (auth.currentUser) {
            pushDataToDB();
        } else {
            toast.warn("Login to save results!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, [])
    return (
        <div className='stats-box'>
            <div className='left'>
                <div className='title'>WPM:</div>
                <div className='sub-title'>{wpm}</div>
                <div className='title'>Accuracy:</div>
                <div className='sub-title'>{accuracy}</div>
                <div className='title'>Characters:</div>
                <div className='sub-title'>
                    {/* corretChar:{corretChar}/inCorretChar:{inCorretChar}/missedChar:{missedChar}/extraChar:{extraChar} */}
                    {corretChar}/{inCorretChar}/{missedChar}/{extraChar}
                </div>
            </div>
            <div className='right'>
                <Graph newGraphData={newGraphData} />
            </div>
        </div>
    )
}

export default Stats