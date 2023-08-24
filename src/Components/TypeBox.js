import React, { useState, useRef, useEffect, useMemo, createRef } from 'react'
import { generate } from 'random-words';
import UpperMenu from './UpperMenu'
import { useTestMode } from '../context/TestModeContext';
import Stats from "./Stats";


const TypeBox = () => {
    const [wordsArr, setWordArr] = useState(() => generate(50));
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
        let arr = new Array(wordsArr.length).fill(0);
        arr = arr.map(i => createRef(null));
        return arr;
        // return new Array(wordsArr.length).fill(0).map(i => createRef(null))

    }, [wordsArr])
    useEffect(() => {
        inpFocus();
        // console.log("inside useEffect")
        if (wordSpanRef[0]?.current) {

            wordSpanRef[0].current.children[0].className = "current"
        }
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
        // console.log(e.key)//user input

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
                // console.log("corretWord", corretWord)
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
                // console.log("extra -. ", allCurrChar[currCharIndex - 1])
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
        testTime == 60 ? setWordArr(() => generate(60)) : setWordArr(() => generate(50));
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestStart(false)
        setTestEnd(false);
        inpFocus()
        clearInterval(intervalId)
        resetWordSpanRefClass()


        setCorectChar(0)
        setInCorectChar(0)
        setMissedChar(0)
        setExtraChar(0)
        setCorectWord(0)
        setGraphData([])

    }
    function resetWordSpanRefClass() {
        // console.log("wordSpanRef", wordSpanRef)

        wordSpanRef.map((obj) => {
            // console.log("obj", obj)

            if (obj?.current)
                Array.from(obj.current.children).map((span) => {
                    span.className = "";
                })
        })
        // console.log("wordSpanRef", wordSpanRef);
        if (wordSpanRef[0].current)
            wordSpanRef[0].current.children[0].className = "current"
    }

    function calculateWPM() {
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
        <div className='middle'>
            <UpperMenu countDown={countDown} resetFun={resetFun} />

            {testEnd ? (<Stats wpm={calculateWPM()} accuracy={String(calculateAccuracy())}
                corretChar={corretChar} inCorretChar={inCorretChar} missedChar={missedChar} extraChar={extraChar} graphData={graphData}
            />) : (
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


            )}






            <input type='text' ref={inpRef} onKeyDown={handleUserInp} className='hidden-inp' />
        </div>
    )
}

export default TypeBox


