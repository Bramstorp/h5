import React, { useState, createContext } from "react";
import { Redirect } from "react-router-dom";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

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

  const onRegister = (fullName, email, password, repeatedPassword) => {
  };

  const onSignout = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`http://localhost:8000/signout`, {
            method: 'GET'
        })
            .then(response => {
                console.log('signout', response);
            })
            .catch(err => console.log(err));
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
        onLogin,
        onRegister,
        onSignout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};