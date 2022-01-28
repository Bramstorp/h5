import React from "react"
import { Route, Navigate  } from "react-router-dom"

export const PrivateRoute = ({ children, isAuthenticated, ...rest }) => (
    <Route
      {...rest}
      render={
        ({ location }) => (
          isAuthenticated ? (
            children
          ) : (
            <Navigate
              to="/"  state={{ from: location }}
            />
          ))
      }
    />
);