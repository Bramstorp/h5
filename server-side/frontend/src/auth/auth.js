import { Redirect } from "react-router-dom"


export const fetchToken = () =>{
    return JSON.stringify(localStorage.getItem('jwt'))
}

export const isAdmin = () =>{
    const value = JSON.parse(fetchToken())
    const requestOptions = {
        method: "GET",
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      };
      fetch(`http://localhost:8000/users/me?token=${JSON.parse(value).access_token}`, requestOptions)
      .then(response => response.json())
      .then(res => {
        if(res.is_admin === true){
            return true
        }
      })
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