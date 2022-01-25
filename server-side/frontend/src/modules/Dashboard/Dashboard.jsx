import React, { useEffect, useState } from "react";

export const Dashboard = () => {
  const [washers, setWashers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/carwashes");
      const json = await response.json();
      setWashers(json)
    }
    fetchData().catch(console.error)
  }, [])

  const carColor = (washinghalls) => {
    let bgColor = "";
    switch (washinghalls.status) {
      case "RUNNING":
        bgColor = "info";
        break;
      case "FREE":
        bgColor = "success";
        break;
      case "STOPPED":
        bgColor = "warning";
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
      <h1>Dashboard</h1>
      <div className="row">
        <p>Washing halls</p>
        {washers.map((wash) => (
          <div className="col-6 mb-4">
            <div className={`card text-light bg-${carColor(wash)}`}>
              <div className="card-body">
                <h5 className="card-title text-center">{wash.name}</h5>
                <p className="card-text">STATUS: {wash.status}</p>
                <p className="card-text">USER: {wash.user}</p>
              </div>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn m-2 btn-light">START</button>
                <button type="button" class="btn m-2 btn-light">PAUSE</button>
                <button type="button" class="btn m-2 btn-light">STOP</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};