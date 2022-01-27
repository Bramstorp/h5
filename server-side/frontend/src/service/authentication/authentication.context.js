import React, { useState, createContext } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  const onLogin = (username, password) => {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      fetch(`http://localhost:8000/login?username=${username}&password=${password}`, requestOptions)
        .then(response => response.json())
        .then(res => setUser(res));
        
  };

  const onRegister = (fullName, email, password, repeatedPassword) => {
  };

  const onLogout = () => {
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};