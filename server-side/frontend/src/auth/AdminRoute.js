import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { fetchToken } from "./index"

export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            fetchToken() && fetchToken().user.role === 1 ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);