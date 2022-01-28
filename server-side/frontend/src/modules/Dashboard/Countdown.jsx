import React, { useEffect, useState, useCallback } from "react";

export const Countdown = ({ id, countdownTime, handleChange, admin, running }) => {
    const [paused, setPaused] = useState(false);
    const [over, setOver] = useState(false);
    const [time, setTime] = useState({
      minutes: parseInt(countdownTime[0], 10),
      seconds: parseInt(countdownTime[1], 10)
    });

    console.log(running)
    
    const tick = async () => {
      const requestOptions = {
        method: 'PUT',
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
    };
    const response = await fetch(`http://localhost:8000/carwash/time?carwash_id=${id}&carwash_time=${time.minutes}%2C${time.seconds}`, requestOptions);
    const data = await response.json();
      console.log(time.minutes, time.seconds)
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
      }else if (running) {
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
      let test1 = null
      let test2 = null
      if (time.minutes !== 0 && time.seconds !== 0){
        test1 = time.minutes
        test2 = time.seconds
      } else {
        test1 = min
        test2 = sec
        setTime({
          minutes: test1,
          seconds: test2,
        });
      }
      const response = await fetch(
        `http://localhost:8000/carwash/start/${id}?time=${test1}%2C${test2}`,
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
    const response = await fetch(`http://localhost:8000/carwash/running/${id}?time=${time.minutes}%2C${time.seconds}`, requestOptions);
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