import React, { useEffect, useState } from "react";
import { Wash } from "./wash"

export const Dashboard = () => {
  const [washers, setWashers] = useState([])

  useEffect(() => {
    fetchData()
  }, [])
  

  const fetchData = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  };

    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/carwashes", requestOptions);
      const json = await response.json();
      setWashers(json)
    }
    fetchData().catch(console.error)
  }

  let ws = null
  const handleChange = async (value) => {
    ws = new WebSocket("ws://localhost:8000/ws");
    ws.onopen = () => ws.send("Connected");
    ws.onmessage = (event) => {
      console.log(event);
    };
    const settings = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
  };

    const fetchData = async () => {
      const response = await fetch("http://localhost:8000/carwashes", settings);
      const json = await response.json();
      setWashers(json)
    }
    fetchData().catch(console.error)
  };

  return (
    <>
      <h1>Dashboard</h1>
      <div className="row">
        <p>Washing halls</p>
        {washers.map((wash) => (
          <Wash wash={wash} handleChange={handleChange} admin={true} />
        ))}
      </div>
    </>
  );
};