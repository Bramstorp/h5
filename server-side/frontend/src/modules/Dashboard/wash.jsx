import React, { useEffect, useState, useCallback } from "react";
import { Countdown } from "./Countdown"

export const Wash = ({ wash, handleChange  }) => {

    console.log(wash)

    const carColor = (wash) => {
        let bgColor = "";
        switch (wash.status) {
          case "RUNNING":
            bgColor = "info";
            break;
          case "FREE":
            bgColor = "success";
            break;
          case "STOPPED":
            bgColor = "danger";
            break;
          case "ERROR":
            bgColor = "danger";
            break;
          default:
            bgColor = "";
        }
        return bgColor;
      };

    return (
        <>
        {wash ? 
        <div className="col-6 mb-4">
        <div className={`card text-light bg-${carColor(wash)}`}>
          <div className="card-body">
            <h5 className="card-title text-center">{wash.name}</h5>
            <p className="card-text">STATUS: {wash.status}</p>
            <p className="card-text">USER: {wash.user}</p>
            {wash.time ? 
            <Countdown handleChange={handleChange} id={wash.id} countdownTime={wash.time.split(",")} />
            : ""}
          </div>
        </div>
      </div>
        : ""}
        </>
    )
}