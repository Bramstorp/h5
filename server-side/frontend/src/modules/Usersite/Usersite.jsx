import React, { useState, useContext, useEffect } from "react";
import "./carwash.card.style.css"
import { fetchToken } from "../../auth/auth"
import { Wash } from "../Dashboard/wash"
import { AuthenticationContext } from "../../service/authentication/authentication.context";


export const Usersite = () => {
    const [user, setUser] = useState("")
    const [currentWash, setCurrentWash] = useState({})
    console.log(user)
    const fetchUser = () => {
      const value = JSON.parse(fetchToken())
      const requestOptions = {
          method: "GET",
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        };
        fetch(`http://localhost:8000/users/me?token=${JSON.parse(value).access_token}`, requestOptions)
        .then(response => response.json())
        .then(res => {
          setUser(res)
        })
    }

    const fetchWash = () => {
      const requestOptions = {
          method: "GET",
          headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        };
        fetch(`http://localhost:8000/carwash/1`, requestOptions)
        .then(response => response.json())
        .then(res => {
          setCurrentWash(res)
        })
    }

    useEffect(() => {
      fetchUser()
      fetchWash()
      }, [])
  return (
<div>     
<div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
    <div className="card p-4">
        <div className=" image d-flex flex-column justify-content-center align-items-center"> <button className="btn btn-secondary"> <img src="https://thispersondoesnotexist.com/image" height="100" width="100" /></button> <span className="name mt-3">username: {user.name}</span> 
        {user && user.is_subscribed ? (
        <span className="subscription">Subscription active</span>
      ) : (
        <span className="subscription">Subscription inactive</span>
      )}
            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center"> <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span> <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span> </div>
        </div>
    </div>
  </div>
  <Wash wash={currentWash} handleChange={fetchWash} />
</div>
  );
};