import React, { useState, createContext } from "react";
import { Redirect } from "react-router-dom";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  const onRegister = (username, password) => {
    var data = {
      "name": "string",
      "password_hash": password,
      "username": username,
      "is_subscribed": false,
      "is_admin": false
    }
    const requestOptions = {
        method: "POST",
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch(`http://localhost:8000/users`, requestOptions)
      .then(response => {
        if (response.status === 200){
          setSuccess(true)
        } else {
          setError(response)
        }
      })
  };

  const onSignout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
    }
};

  const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
  };
  

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        error,
        success,
        onLogin,
        onRegister,
        onSignout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};