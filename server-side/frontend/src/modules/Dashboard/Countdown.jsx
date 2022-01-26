import React, { useEffect, useState } from "react";

export const Countdown = ({ minutes = 0, seconds = 0 }) => {
    const [paused, setPaused] = useState(false);
    const [over, setOver] = useState(false);
    const [time, setTime] = useState({
      minutes: parseInt(minutes, 10),
      seconds: parseInt(seconds, 10)
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
  
    const stop = () => {
      setTime({
        minutes: parseInt(minutes),
        seconds: parseInt(seconds)
      });
      setPaused(false);
      setOver(false);
    };

    const start = (min, sec) => {
        setTime({
            minutes: parseInt(min),
            seconds: parseInt(sec)
        });
        setPaused(false);
        setOver(false);
    };
  
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
        <div class="row">
          <button
            className="btn m-2 col btn-light"
            onClick={() => start(29, 59)}
          >
            Start
          </button>
          <button
            className="btn m-2 col btn-light"
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Resume" : "Pause"}
          </button>
          <button className="btn m-2 col btn-light" onClick={() => stop()}>
            Stop
          </button>
        </div>
      </div>
    );
  };