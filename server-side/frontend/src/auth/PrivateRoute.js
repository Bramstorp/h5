import React from "react"
import { Route, Redirect } from "react-router-dom"

export const PrivateRoute = ({ children, isAuthenticated, ...rest }) => (
    <Route
      {...rest}
      render={
        ({ location }) => (
          isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location }
              }}
            />
          ))
      }
    />
);