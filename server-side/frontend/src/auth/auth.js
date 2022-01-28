import { Navigate } from "react-router-dom"

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