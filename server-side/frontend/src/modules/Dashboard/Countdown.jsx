import React, { useEffect, useState, useCallback } from "react";

export const Countdown = ({ id, countdownTime, handleChange  }) => {
    const [paused, setPaused] = useState(false);
    const [over, setOver] = useState(false);
    const [time, setTime] = useState({
      minutes: parseInt(countdownTime[0], 10),
      seconds: parseInt(countdownTime[1], 10)
    });

    const tick = () => {
      if (paused || over) return;
  
      if (time.minutes === 0 && time.seconds === 0) {
        setOver(true);
      } else if (time.minutes === 0 && time.seconds === 0) {
        setTime({
          minutes: 59,
          seconds: 59
        });
      } else if (time.seconds === 0) {
        setTime({
          minutes: time.minutes - 1,
          seconds: 59
        });
      } else {
        setTime({
          minutes: time.minutes,
          seconds: time.seconds - 1
        });
      }
    };

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

    const stop = () => {
      setTime({
        minutes: parseInt(0),
        seconds: parseInt(0)
      });
      setPaused(false);
      setOver(false);
    }

    const start = (min, sec) => {
        setTime({
            minutes: parseInt(min),
            seconds: parseInt(sec)
        });
        setPaused(false);
        setOver(false);
    };

    const pause = async () => {
      const data = {
        "id": id,
        "name": "string",
        "status": "STOPPED",
        "time": `${time.minutes}:${time.seconds}`
      }
      const config = {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      }
      //const response = await fetch(url, config)
      setPaused(true)
    }
  
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
            onClick={() => start(29, 59)}
          >
            Start
          </button>
          <button
            className="btn m-2 col btn-light"
            onClick={() => pause()}
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button className="btn m-2 col btn-light" onClick={() => { callBack(); stop();}}>
            Stop
          </button>
        </div>
      </div>
    );
  };