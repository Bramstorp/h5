import { Redirect } from "react-router-dom"

export const setToken = (token)=>{
    localStorage.setItem('temitope', token)
}

export const fetchToken = ()=>{
    return localStorage.getItem('temitope')
}

export function RequireToken({children}){
    let auth = fetchToken()
    if(!auth){
        return <Redirect to='/' />;
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