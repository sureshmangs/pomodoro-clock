import React, { useState, useEffect, useRef } from 'react';
import alarm from './alarm.wav';

function Clock() {
    const initialBreakLength = 5;    // in minutes
    const initialSessionLength = 25;    // in minutes
    const initialTimeLeft = initialSessionLength * 60;  // in seconds
    const [breakLength, setBreakLength] = useState(initialBreakLength);
    const [sessionLength, setSessionLength] = useState(initialSessionLength);
    const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
    const [isPlay, setIsPlay] = useState(false);
    const [pomodoroType, setPomodoroType] = useState('Session');
    const sessionIntervalRef = useRef();
    const breakIntervalRef = useRef();
    const audioRef = useRef(null);

    const incrementBreak = () => {
        !isPlay && setBreakLength(prevState => prevState + 1);
    }

    const decrementBreak = () => {
        !isPlay && setBreakLength(prevState => {
            if (prevState - 1 < 0) return prevState
            else return prevState - 1
        });
    }

    const incrementSession = () => {
        !isPlay && setSessionLength(prevState => prevState + 1);
        !isPlay && setTimeLeft(prevState => Math.round(Math.floor((prevState + 60) / 60)) * 60);
    }

    const decrementSession = () => {
        !isPlay && setSessionLength(prevState => {
            if (prevState - 1 < 0) return prevState
            else return prevState - 1
        });
        !isPlay && setTimeLeft(prevState => {
            if (prevState - 60 < 0) return 0;
            else if (prevState % 60 === 0) return prevState - 60;
            else return prevState - (prevState % 60);
        });
    }

    const decrementTimeLeft = () => {
        setTimeLeft(prevState => {
            if (prevState - 1 < 0) return prevState
            else return prevState - 1
        })
    }

    const handlePlayPause = () => {
        setIsPlay(prevState => !prevState);

    }

    const handleReset = () => {
        setBreakLength(initialBreakLength);
        setSessionLength(initialSessionLength);
        setTimeLeft(initialTimeLeft);
        setPomodoroType('Session');
        setIsPlay(false);
        audioRef.current.pause();
        audioRef.current.currentTime = 0.0;

    }

    useEffect(() => {
        if (isPlay === true && pomodoroType === 'Session') {
            sessionIntervalRef.current = setInterval(() => {
                decrementTimeLeft();
                if (timeLeft === 0) {
                    clearInterval(sessionIntervalRef.current);
                    // play audio
                    audioRef.current.play();
                    // start the break session
                    setPomodoroType('Break');
                    setTimeLeft(breakLength * 60);
                }
            }, 1000)
        } else if (isPlay === false && pomodoroType === 'Session') {
            clearInterval(sessionIntervalRef.current);
        }

        if (isPlay === true && pomodoroType === 'Break') {
            breakIntervalRef.current = setInterval(() => {
                decrementTimeLeft();
                if (timeLeft === 0) {
                    clearInterval(breakIntervalRef.current);
                    // play audio
                    audioRef.current.play();
                    // start the  session
                    setPomodoroType('Session');
                    setTimeLeft(sessionLength * 60);
                }

            }, 1000);
        } else if (isPlay === false && pomodoroType === 'Break') {
            clearInterval(breakIntervalRef.current);
        }

        // on unmounting
        return () => {
            clearInterval(sessionIntervalRef.current);
            clearInterval(breakIntervalRef.current);
        }
    }, [isPlay, timeLeft, pomodoroType, breakLength, sessionLength]);
    return (
        <div className="container">
            <h2 id="head">Pomodoro</h2>
            <div className="operation">
                <div className="operation-1">
                    <p className="operation-head" id="break-label">Break Length</p>
                    <span className="click" id="break-decrement" onClick={incrementBreak}><i className="fas fa-angle-up"></i></span>
                    <span id="break-length">{breakLength}</span>
                    <span className="click" id="session-decrement" onClick={decrementBreak}><i className="fas fa-angle-down"></i></span>
                </div>
                <div className="operation-2">
                    <p className="operation-head" id="session-label">Session Length</p>
                    <span className="click" id="break-increment" onClick={incrementSession}><i className="fas fa-angle-up"></i></span>
                    <span id="session-length">{sessionLength}</span>
                    <span className="click" id="session-increment" onClick={decrementSession}><i className="fas fa-angle-down"></i></span>
                </div>
            </div>

            <div className="time-box">
                <div className="time">
                    <p id="timer-label">{pomodoroType}</p>
                    <p id="time-left"> {Math.round(Math.floor(timeLeft / 60)) < 10 ? '0' : null}{Math.round(Math.floor(timeLeft / 60))}:
                    {timeLeft % 60 < 10 ? '0' : null}{timeLeft % 60} </p>
                </div>
            </div>
            <div>
                <span className="click" id="start_stop" onClick={handlePlayPause}><i className="fas fa-play-circle"></i></span>
                <span className="click" id="reset" onClick={handleReset}><i className="fas fa-sync-alt "></i></span>
            </div>

            <audio ref={audioRef} id="beep" src={alarm} />
        </div>
    )
}

export default Clock
