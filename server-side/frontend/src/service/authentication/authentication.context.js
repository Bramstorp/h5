import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchToken } from "../../auth/auth"

const axios = require('axios').default;

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () =>{
    const value = JSON.parse(fetchToken())
    if (value){
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
}

  const onLogin = (username, password) => {
    var details = {
      grant_type: "",
      username: username,
      password: password,
      scope: "",
      client_id: "",
      client_secret: "",
    };

    var formBody = [];
    for (var property in details) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    const requestOptions = {
        method: "POST",
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
      };
      fetch(`http://localhost:8000/token`, requestOptions)
      .then(response => response.json())
      .then(res => {
        localStorage.setItem('jwt', JSON.stringify(res));
      })
  };

  const onRegister = async (username, password) => {
    setIsLoading(true);
    axios.post("http://localhost:8000/users", {
        name: username,
        password_hash: password,
        username: username,
        is_subscribed: false,
        is_admin: false,
      })
      .then(function (response) {
        navigate("/");
      })
      .catch(function (error) {
        setError(`der skete en opsi:`)
      });
  };

  const onSignout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
    }
    setUser(null)
    setError(null);
};
  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onSignout,
        message,
        success,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};