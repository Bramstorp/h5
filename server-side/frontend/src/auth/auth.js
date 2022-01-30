import { Navigate } from "react-router-dom"
import { AuthenticationContext } from "../service/authentication/authentication.context";
import React, { useContext } from "react";

export const fetchToken = () =>{
    return JSON.stringify(localStorage.getItem('jwt'))
}

export function RequireToken({children}){
    let auth = fetchToken()
    if(auth === "null"){
        return <Navigate to='/' />;
    }
    return children;
}

export function HaveToken({children}){
    let auth = fetchToken()
    if(auth !== "null"){
        return <Navigate to='/user' />;
    }
    return children;
}


export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return localStorage.getItem('jwt')
    } else {
        return false;
    }
};

export const IsAdmin = ({ children }) => {
    const { user } = useContext(AuthenticationContext);

    if (user){
        if(!user.is_admin){
            return <Navigate to='/user' />;
        }
    }
    return children;
}