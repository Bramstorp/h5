import React from "react";

export const Dashboard = () => {
  const cars = ["bmw", "mercedes"]
  const wash = {
    washinghalls: [
      { name: "Wash1", status: "RUNNING",  user: "torben" },
      { name: "Wash2", status: "FREE", user: "bjarne" },
      { name: "Wash3", status: "ERROR",  user: "torben" },
      { name: "Wash4", status: "STOPPED", user: "bjarne" },
    ],
  };
  
  console.log(wash.washinghalls)

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
        {wash.washinghalls.map((wash) => (
          <div className={`col-6 card text-light bg-${carColor(wash)}`}>
            <div className="card-body">
              <h5 className="card-title">{wash.name}</h5>
              <p className="card-text">STATUS: {wash.status}</p>
              <p className="card-text">USER: {wash.user}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};