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

  useEffect(() => {
    getUser()
  }, [success])

  const getUser = async () =>{
    const value = JSON.parse(fetchToken())
    if (value){
      await axios.get(`http://localhost:8000/users/me?token=${JSON.parse(value).access_token}`)
      .then(function (response) {
        setUser(response.data)
      })
      .catch(function (error) {
        setError(`der skete en opsi:`)
      });
    }
}

  const onLogin = async (username, password) => {
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

    await axios.post(`http://localhost:8000/token`, formBody)
    .then(function (response) {
      localStorage.setItem("jwt", JSON.stringify(response.data))
      setSuccess(true)
      navigate("/user");
    })
    .catch(function (error) {
      setError(`der skete en opsi:`)
    });
  };

  const onRegister = async (username, password) => {
    setIsLoading(true);
    await axios.post("http://localhost:8000/users", {
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
        success,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};