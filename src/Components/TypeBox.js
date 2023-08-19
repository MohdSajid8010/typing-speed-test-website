import React, { useState, useRef, useEffect, useMemo, createRef } from 'react'
import { generate } from 'random-words';
import UpperMenu from './UpperMenu'
import { useTestMode } from '../context/TestModeContext';
import Stats from "./Stats";


const TypeBox = () => {
    const [wordsArr, setWordArr] = useState(() => generate(40));
    const inpRef = useRef(null);//{current: null}

    const { testTime } = useTestMode()
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [countDown, setCountDown] = useState(testTime)
    const [testStart, setTestStart] = useState(false)
    const [testEnd, setTestEnd] = useState(false);
    const [intervalId, setIntervalId] = useState(null);
    const [corretChar, setCorectChar] = useState(0)
    const [inCorretChar, setInCorectChar] = useState(0)
    const [missedChar, setMissedChar] = useState(0)
    const [extraChar, setExtraChar] = useState(0)
    const [corretWord, setCorectWord] = useState(0)
    const [graphData, setGraphData] = useState([])







    const wordSpanRef = useMemo(() => {
        let arr = new Array(wordsArr.length).fill(0)
        arr = arr.map(i => createRef(null));
        return arr;
        // return new Array(wordsArr.length).fill(0).map(i => createRef(null))

    }, [wordsArr])
    // console.log(wordSpanRef)
    // console.log(inpRef)
    // console.log(wordsArr)
    useEffect(() => {
        inpFocus();
        wordSpanRef[0].current.children[0].className = "current"
        // wordSpanRef[0].current.className = "current-right"
        // startTimer()

    }, [])
    useEffect(() => {
        // setCountDown(testTime)
        resetFun()
    }, [testTime])

    function startTimer() {
        let timerid = setInterval(timer, 1000)
        setIntervalId(timerid);

        function timer() {
            // setCountDown(countDown - 1)
            setCountDown((latestCtDown) => {
                setCorectChar((corretChar) => {
                    setGraphData((graphData) => {
                        return [...graphData, [testTime - latestCtDown + 1,
                        (corretChar / 5) / ((testTime - latestCtDown + 1) / 60)]
                        ]
                    })
                    return corretChar;
                })

                if (latestCtDown === 1) {
                    setTestEnd(true);
                    clearInterval(timerid);
                    return 0;
                }
                return latestCtDown - 1
            })
        }

    }

    function inpFocus() {
        inpRef.current.focus();
    }

    function handleUserInp(e) {
        console.log(e.key)//user input

        if (!testStart) {
            startTimer()
            setTestStart(true);
        }
        if (testEnd) return;

        let allCurrChar = wordSpanRef[currWordIndex].current.children;//Nodelist
        if (e.keyCode === 32) {//logic for space

            let correcrCharinWord = wordSpanRef[currWordIndex].current.querySelectorAll(".correct");
            if (allCurrChar.length === correcrCharinWord.length) {
                setCorectWord(corretWord + 1)
                console.log("corretWord", corretWord)
            }
            if (allCurrChar.length <= currCharIndex) {//==
                // remove cursor from last place
                allCurrChar[currCharIndex - 1].classList.remove("current-right")//right cursor

            } else {
                // remove cursor from in between of word
                allCurrChar[currCharIndex].classList.remove("current")//left cursor
                setMissedChar(missedChar + (allCurrChar.length - currCharIndex))

            }
            wordSpanRef[currWordIndex + 1].current.children[0].className = "current"
            setCurrWordIndex(currWordIndex + 1);
            setCurrCharIndex(0);
            return;
        }

        if (e.keyCode === 8) {//logic for backspace
            if (currCharIndex === allCurrChar.length) {
                console.log("extra -. ", allCurrChar[currCharIndex - 1])
                if (allCurrChar[currCharIndex - 1].classList.contains("extra")) {
                    allCurrChar[currCharIndex - 1].remove()
                    allCurrChar[currCharIndex - 2].classList.add("current-right")

                } else {

                    allCurrChar[currCharIndex - 1].className = "";//remove correct or incorrect  and current-right
                    allCurrChar[currCharIndex - 1].className = "current"
                }
                setCurrCharIndex(currCharIndex - 1)
                return
            }


            if (currCharIndex !== 0) {
                allCurrChar[currCharIndex].className = "";//remove left cursor
                allCurrChar[currCharIndex - 1].className = "";//remove correct or incorrect 
                allCurrChar[currCharIndex - 1].className = "current"
                setCurrCharIndex(currCharIndex - 1)
            }
            return;
        }

        //enter extra character
        if (currCharIndex === allCurrChar.length) {
            let newSpan = document.createElement("span");
            newSpan.innerText = e.key;
            newSpan.className = "incorrect extra current-right"
            wordSpanRef[currWordIndex].current.append(newSpan);
            allCurrChar[currCharIndex - 1].classList.remove("current-right")
            setCurrCharIndex(currCharIndex + 1);

            setExtraChar(extraChar + 1)
            return;

        }

        //checking correct or incorrect char
        if (e.key === allCurrChar[currCharIndex].innerText) {
            allCurrChar[currCharIndex].className = "correct"
            setCorectChar(corretChar + 1)
        } else {
            allCurrChar[currCharIndex].className = "incorrect"
            setInCorectChar(inCorretChar + 1)

        }

        if (currCharIndex + 1 === allCurrChar.length) {//last index,last char
            //because [currCharIndex + 1] become out of bound
            //correcr or incorrrect and current-right
            allCurrChar[currCharIndex].className += " current-right"

        } else {
            // setTimeout(() => {
            //     allCurrChar[currCharIndex + 1].className = "current"

            // }, 100)
            //if not last indexing
            allCurrChar[currCharIndex + 1].className = "current"
        }
        setCurrCharIndex(currCharIndex + 1)
        // console.log(currCharIndex)


    }

    function resetFun() {
        setCountDown(testTime)
        setWordArr(() => generate(40));
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false)
        setTestEnd(false);
        inpFocus()
        clearInterval(intervalId)
        resetWordSpanRefClass()

        setCorectWord(0)
    }
    function resetWordSpanRefClass() {
        wordSpanRef.map((obj) => {
            Array.from(obj.current.children).map((span) => {
                span.className = "";
            })
        })
        wordSpanRef[0].current.children[0].className = "current"
    }

    function calculateWPM() {
        // console.log(((200)/5)/(60/60))
        return Math.round(((corretChar) / 5) / (testTime / 60));
    }

    function calculateAccuracy() {
        // console.log( Math.round((corretWord / currWordIndex) *100))
        // currWordIndex = currWordIndex === 0 ? 1 : currWordIndex;
        console.log(corretWord, currWordIndex)
        // if (currWordIndex === 0) return 0;
        return Math.round((corretWord / currWordIndex) * 100);

    }
    return (
        <div>
            <UpperMenu countDown={countDown} />
            {testEnd ? (<Stats wpm={calculateWPM()} accuracy={calculateAccuracy()}
                corretChar={corretChar} inCorretChar={inCorretChar} missedChar={missedChar} extraChar={extraChar} graphData={graphData}
            />) : (
                // <div className='type-box' onClick={() => inpFocus()}>
                //     <div className='words'>
                //         {
                //             wordsArr.map((words, i) => {
                //                 return (
                //                     <span className='word' ref={wordSpanRef[i]}>
                //                         {
                //                             words.split("").map((char) => {
                //                                 return <span className=''>{char}</span>
                //                             })
                //                         }
                //                     </span>
                //                 )
                //             })
                //         }
                //     </div>
                // </div>


                ""
            )}




            <div className='type-box' onClick={() => inpFocus()}>
                <div className='words'>
                    {
                        wordsArr.map((words, i) => {
                            return (
                                <span className='word' ref={wordSpanRef[i]}>
                                    {
                                        words.split("").map((char) => {
                                            return <span className=''>{char}</span>
                                        })
                                    }
                                </span>
                            )
                        })
                    }
                </div>
            </div>

            <input type='text' ref={inpRef} onKeyDown={handleUserInp} />
        </div>
    )
}

export default TypeBox



/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6XRXwV2y41V2fdgxjA_ek-zQ6pT8klww",
  authDomain: "typing-speed-test-websit-8187e.firebaseapp.com",
  projectId: "typing-speed-test-websit-8187e",
  storageBucket: "typing-speed-test-websit-8187e.appspot.com",
  messagingSenderId: "327615661271",
  appId: "1:327615661271:web:66a57cc2f7b56a6504dc92",
  measurementId: "G-D4M81M28G4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/




