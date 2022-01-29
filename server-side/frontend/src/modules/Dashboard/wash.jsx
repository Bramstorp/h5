import React, { useState } from "react";
import { Countdown } from "./Countdown"

export const Wash = ({ wash, handleChange, admin }) => {
  const [state, setState] = useState(wash.status);
  
    const setCurrentStatus = async (updateState) => {
      setState(updateState)
    };

    const carColor = (state) => {
        let bgColor = "";
        switch (state) {
          case "RUNNING":
            bgColor = "info";
            break;
          case "FREE":
            bgColor = "success";
            break;
          case "STOPPED":
            bgColor = "danger";
            break;
          case "PAUSED":
            bgColor = "warning";
            break;
          default:
            bgColor = "FREE";
        }
        return bgColor;
      };

    return (
      <>
        {wash ? (
          <div className="col-6 mb-4">
            <div
              style={{ textAlign: "left" }}
              className={`card text-light bg-${carColor(wash.status)}`}
            >
              <div className="card-body">
                <h5 className="card-title text-center">{wash.name}</h5>
                <p className="card-text">STATUS: {state}</p>
                <p className="card-text">USER: {wash.user}</p>
                {wash.time ? (
                  <Countdown
                    admin={admin}
                    handleChange={handleChange}
                    id={wash.id}
                    countdownTime={wash.time.split(",")}
                    washStatus={wash.status}
                    setCurrentStatus={setCurrentStatus}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </>
    );
}