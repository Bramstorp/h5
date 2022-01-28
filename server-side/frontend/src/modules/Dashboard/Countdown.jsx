import React, { useEffect, useState, useCallback } from "react";

export const Countdown = ({ id, countdownTime, handleChange, admin, washStatus }) => {
    const [paused, setPaused] = useState(false);
    const [over, setOver] = useState(false);
    const [time, setTime] = useState({
      minutes: parseInt(countdownTime[0], 10),
      seconds: parseInt(countdownTime[1], 10)
    });    

    const tick = async () => {
      let data;
      if (washStatus === "RUNNING" || washStatus === "FREE") {
        const requestOptions = {
          method: 'PUT',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      };
      const response = await fetch(`http://localhost:8000/carwash/time?carwash_id=${id}&carwash_time=${time.minutes}%2C${time.seconds}`, requestOptions);
      data = await response.json();
      };

      if (paused || over) return;
  
      if (time.minutes === 0 && time.seconds === 0) {
        const req ={
          method: 'PUT',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
        if (washStatus === "RUNNING" || washStatus === "FREE"){
          const response = await fetch(`http://localhost:8000/carwash/free/${id}?time=00%2C00`, req);
          data = await response.json();
          callBack()
          setOver(true);
        } else {
          const response = await fetch(`http://localhost:8000/carwash/stop/${id}?time=00%2C00`, req);
          data = await response.json();
          callBack()
          setOver(true);
        }
        return data
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
      }else if (washStatus === "RUNNING") {
        setTime({
          minutes: time.minutes,
          seconds: time.seconds - 1
        });
      }
      return data
    };

    const stop = async () => {
      const requestOptions = {
          method: 'PUT',
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      };
      const response = await fetch(`http://localhost:8000/carwash/stop/${id}?time=00%2C00`, requestOptions);
      const data = await response.json();

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

      setPaused(false);
      setOver(false);
      callBack()
      return data
    }

    const start = async (min, sec) => {
      const requestOptions = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      let current_min = null
      let current_sec = null
      if (time.minutes !== 0 && time.seconds !== 0){
        current_min = time.minutes
        current_sec = time.seconds
      } else {
        current_min = min
        current_sec = sec
        setTime({
          minutes: current_min,
          seconds: current_sec,
        });
      }
      const response = await fetch(
        `http://localhost:8000/carwash/running/${id}?time=${test1}%2C${test2}`,
        requestOptions
      );
      const data = await response.json();
      setPaused(false);
      setOver(false);
      callBack()
      return data;
    };

    const pause = async () => {
      const requestOptions = {
        method: 'PUT',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    };
    const response = await fetch(`http://localhost:8000/carwash/pause/${id}?time=${time.minutes}%2C${time.seconds}`, requestOptions);
    const data = await response.json();
    setPaused(true)
    callBack()
    return data
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