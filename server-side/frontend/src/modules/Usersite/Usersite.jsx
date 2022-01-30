import React, { useState, useEffect, useContext } from "react";
import "./carwash.card.style.css"
import { Wash } from "../Dashboard/wash"
import { AuthenticationContext } from "../../service/authentication/authentication.context";
import { BuySubscription } from "./BuySubscription"

const axios = require("axios").default;


export const Usersite = () => {
    const [currentWash, setCurrentWash] = useState({})
    const [error, setError] = useState(null)

    const { user } = useContext(AuthenticationContext);

    const fetchWash = async () => {
      await axios
        .get("http://localhost:8000/carwash/1")
        .then(function (response) {
          setCurrentWash(response.data);
        })
        .catch(function (error) {
          setError(`No washer found`);
        });
    };

    useEffect(() => {
      fetchWash()
      }, [])
  return (
    <>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
      {user ? (
        <div>
          <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
            <div className="card p-4">
              <div className=" image d-flex flex-column justify-content-center align-items-center">
                <button className="btn btn-secondary">
                  <img
                    src="https://thispersondoesnotexist.com/image"
                    height="100"
                    width="100"
                  />
                </button>
                {user.is_admin ? <span>ADMIN</span> : ""}
                <span className="name">name: {user.username}</span>
                {user.is_subscribed ? (
                  <span className="subscription">Subscription active</span>
                ) : (
                  <span className="subscription">Subscription inactive</span>
                )}
                <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                  {" "}
                  <span>
                    <i className="fa fa-twitter"></i>
                  </span>{" "}
                  <span>
                    <i className="fa fa-facebook-f"></i>
                  </span>{" "}
                  <span>
                    <i className="fa fa-instagram"></i>
                  </span>{" "}
                  <span>
                    <i className="fa fa-linkedin"></i>
                  </span>{" "}
                </div>
              </div>
            </div>
          </div>

          <BuySubscription />

          {currentWash ? (
            <div style={{ textAlign: "-webkit-center" }}>
              <Wash admin={true} wash={currentWash} handleChange={fetchWash} />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};