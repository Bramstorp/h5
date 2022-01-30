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
      const statusName = "STOPPED"
      setTime({
        minutes: 0,
        seconds: 0
      });
      setPaused(false);
      setOver(false);
      updateWash(0, 0, statusName)
      setCurrentStatus(statusName)
    }

    const start = async (min, sec) => {
      const statusName = "RUNNING"
      let test1;
      let test2;
      if (time.minutes === 0 && time.seconds === 0){
        test1 = min
        test2 = sec
        setTime({
          minutes: min,
          seconds: sec,
        });
      } else {
        test1 = time.minutes
        test2 = time.seconds
        setTime({
          minutes: time.minutes,
          seconds: time.seconds,
        });
      }
      updateWash(test1, test2, statusName)
      setPaused(false);
      setOver(false);
      setCurrentStatus(statusName)
    };

    const pause = async () => {
      const statusName = "PAUSED"
      updateWash(time.minutes, time.seconds, statusName)
      setPaused(true)
      setCurrentStatus(statusName)
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