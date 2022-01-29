import React, { useEffect, useState, useContext } from "react";
import { Wash } from "./wash";
import { AuthenticationContext } from "../../service/authentication/authentication.context";

const axios = require("axios").default;

export const Dashboard = () => {
  const [washers, setWashers] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    fetchWasher();
  }, []);

  const handleChange = async () => {
    fetchWasher();
  };

  const fetchWasher = async () => {
    await axios
      .get("http://localhost:8000/carwashes")
      .then(function (response) {
        setWashers(response.data);
      })
      .catch(function (error) {
        setError(`No washer found`);
      });
  };
  return (
    <>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
      {user ? (
        <>
          <h1>Dashboard</h1>
          <div className="row">
            <p>Washing halls</p>
            {washers.map((wash, index) => (
              <Wash key={index} wash={wash} admin={true} handleChange={handleChange} />
            ))}
          </div>
        </>
      ) : (
        <p>No user to show</p>
      )}
    </>
  );
};
