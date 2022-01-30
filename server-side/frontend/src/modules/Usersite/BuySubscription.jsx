import React, { useContext, useState } from "react";
import { AuthenticationContext } from "../../service/authentication/authentication.context";

const axios = require("axios").default;

export const BuySubscription = () => {
    const { user, getUser } = useContext(AuthenticationContext);
    const [error, setError] = useState(null)

    const buySubscription = () => {
        if (user){
            axios.put(`http://localhost:8000/users?user_id=${user.id}&subscribed=true`)      
            .then(function (response) {
                getUser()
            })
            .catch(function (error) {
                setError(error);
            });
        }
    }

    return (
        <div className="text-center pb-4">
            <button className="btn btn-primary" onClick={buySubscription} >Køb subscription</button>
        </div>
    )
}