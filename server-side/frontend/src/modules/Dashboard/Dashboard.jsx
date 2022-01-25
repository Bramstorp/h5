import React, { useEffect, useState } from "react";

export const Dashboard = () => {
  const [wash, setWash] = useState([])
  console.log(wash)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/carwashes");
      const json = await response.json();
      setWash(json)
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
        {wash.map((wash) => (
          <div className="col-6 mb-4">
            <div className={`card text-light bg-${carColor(wash)}`}>
              <div className="card-body">
                <h5 className="card-title">{wash.name}</h5>
                <p className="card-text">STATUS: {wash.status}</p>
                <p className="card-text">USER: {wash.user}</p>
              </div>
              <div class="row">
                <a href="#" type="button" className="col-4 btn btn-light">
                  Start
                </a>
                <a href="#" type="button" className="col-4 mr-3 btn btn-light">
                  Pause
                </a>
                <a href="#" type="button" className="col-4 btn btn-light">
                  Stop
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};