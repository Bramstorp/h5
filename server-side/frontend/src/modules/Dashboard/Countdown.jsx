import React, { useEffect, useState, useCallback } from "react";

export const Countdown = ({ id, countdownTime, handleChange, admin, washStatus, setCurrentStatus }) => {
    const [paused, setPaused] = useState(false);
    const [over, setOver] = useState(false);
    const [time, setTime] = useState({
      minutes: parseInt(countdownTime[0], 10),
      seconds: parseInt(countdownTime[1], 10)
    });
    const [ status, setStatus ] = useState("FREE")

    const tick = async () => {
      if (paused || over) return;
  
      if (time.minutes === 0 && time.seconds === 0) {
        setOver(true);
      }else if (time.minutes === 0 && time.seconds === 0) {
        setTime({
          minutes: 59,
          seconds: 59
        });
      } else if (time.seconds === 0) {
        setTime({
          minutes: time.minutes - 1,
          seconds: 59
        });
      }else {
        setTime({
          minutes: time.minutes,
          seconds: time.seconds - 1
        });
      }
    };

    const stop = async () => {
      if (time.minutes === 29 && time.seconds === 59){
        setTime({
          minutes: parseInt(0),
          seconds: parseInt(0)
        });
      } else {
        setTime({
          minutes: 0,
          seconds: 0
        });
      }
      setCurrentStatus("STOPPED")
      setPaused(false);
      setOver(false);
      callBack()
    }

    const start = async (min, sec) => {
      if (time.minutes === 0 && time.seconds === 0){
        setTime({
          minutes: 29,
          seconds: 59,
        });
      } else {
        setTime({
          minutes: time.minutes,
          seconds: time.seconds,
        });
      }
      setPaused(false);
      setOver(false);
      setCurrentStatus("RUNNING")
      callBack()
    };

    const pause = async () => {
      setCurrentStatus("PAUSED")
      setPaused(true)
      callBack()
    }

    const callBack = useCallback(
      () =>
        handleChange([
          {
            id: id,
            time: time,
          },
        ]),
      [
        handleChange,
        [
          {
            id: id,
            time: time,
          },
        ],
      ]
    );
  
    useEffect(() => {
      let timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    });
  
    return (
      <div>
        <p className="text-center">{`${time.minutes
          .toString()
          .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}</p>
        <div className="text-center">{over ? "NOT RUNNING" : ""}</div>
        <div className="row">
          <button
            className="btn m-2 col btn-light"
            onClick={() => { start(29, 59);}}
          >
            Start
          </button>
          <button
            className="btn m-2 col btn-light"
            onClick={() => { pause();}}
          >
            Pause
          </button>
          {admin ?
          <button className="btn m-2 col btn-light" onClick={() => { stop();}}>
            Stop
          </button>
          : ""}
        </div>
      </div>
    );
  };