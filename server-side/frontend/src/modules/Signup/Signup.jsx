import React, { useState } from "react";

export const Signup = () => {
  const [username, setUsername] = useState("")
  const [password1, setPassword1] = useState("")
  const [password2, setPassword2] = useState("")

  const userSignup = () => 
  {
    if (password1 !== password2){
        console.log("nippa")
    } else {
        const data = {
            "name": username,
            "password": password1,
            "username": username,
            "is_subscribed": false,
            "salt": "",
            "is_admin": false
        };
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        };
        fetch("http://localhost:8000/user", requestOptions)
          .then(response => response.json())
          .then(res => console.log(res));
    }
  }

  return (
        <section className="vh-100 gradient-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 login-box">
                <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center login-box">
                        <div className="mb-md-5 mt-md-4 pb-5">
                        <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                        <p className="text-white-50 mb-5">Please enter your username and password</p>

                        <div className="form-outline form-white mb-4">
                            <input type="username" id="typeUsernameX" className="form-control form-control-lg" onChange={e => setUsername(e.target.value)} value={username} />
                            <label className="form-label" htmlFor="typeEmailX">Username</label>
                        </div>

                        <div className="form-outline form-white mb-4">
                            <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={e => setPassword1(e.target.value)} value={password1} />
                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                        </div>

                        <div className="form-outline form-white mb-4">
                            <input type="password" id="typePasswordX" className="form-control form-control-lg" onChange={e => setPassword2(e.target.value)} value={password2} />
                            <label className="form-label" htmlFor="typePasswordX">Confirm Password</label>
                        </div>

                        <button className="btn btn-outline-light btn-lg px-5" onClick={() => userSignup()}>Signup</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
  );
};