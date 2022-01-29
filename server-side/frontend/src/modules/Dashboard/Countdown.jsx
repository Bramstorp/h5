import React, { useEffect, useState, useCallback } from "react";
const axios = require("axios").default;

export const Countdown = ({ id, countdownTime, handleChange, admin, washStatus, setCurrentStatus }) => {
    const [paused, setPaused] = useState(false);
    const [over, setOver] = useState(false);
    const [time, setTime] = useState({
      minutes: parseInt(countdownTime[0], 10),
      seconds: parseInt(countdownTime[1], 10)
    });

    const updateWash = async (min, sec, status) => {
      await axios.put(`http://localhost:8000/carwash/update/${id}?time=${min}%2C${sec}&status=${status}`)
    };

    const tick = async () => {
      if (paused || over) return;
  
      if (time.minutes === 0 && time.seconds === 0) {
        if(washStatus === "RUNNING"){
          setCurrentStatus("FREE")
        }
        setOver(true);
        setPaused(true)
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
        if(washStatus === "RUNNING"){
          setTime({
            minutes: time.minutes,
            seconds: time.seconds - 1
          });
        }
      }
    };

    const stop = async () => {
      setTime({
        minutes: 0,
        seconds: 0
      });
      setCurrentStatus("STOPPED")
      setPaused(false);
      setOver(false);
      updateWash(0, 0, "STOPPED")
      callBack()
    }

    const start = async (min, sec) => {
      if (time.minutes === 0 && time.seconds === 0){
        setTime({
          minutes: min,
          seconds: sec,
        });
      } else {

        setTime({
          minutes: time.minutes,
          seconds: time.seconds,
        });
      }
      setCurrentStatus("RUNNING")
      updateWash(time.minute, time.seconds, "RUNNING")
      setPaused(false);
      setOver(false);
      callBack()
    };

    const pause = async () => {
      setCurrentStatus("PAUSED")
      updateWash(time.minutes, time.seconds, "PAUSED")
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