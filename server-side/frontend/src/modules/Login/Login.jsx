import React, { useState, useContext } from "react";
import "./Login.style.css"
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../../service/authentication/authentication.context";

export const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { onLogin, error } = useContext(AuthenticationContext);

  return (
    <>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
      <div className="row d-flex justify-content-center align-items-center h-100 login-container">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5 login-box">
          <div className="card bg-dark text-white login-box">
            <div className="card-body p-5 text-center login-box">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">
                  Please enter your login and password!
                </p>

                <div className="form-outline form-white mb-4">
                  <input
                    type="username"
                    id="typeUsernameX"
                    className="form-control form-control-lg"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                  <label className="form-label" htmlFor="typeEmailX">
                    Username
                  </label>
                </div>

                <div className="form-outline form-white mb-4">
                  <input
                    type="password"
                    id="typePasswordX"
                    className="form-control form-control-lg"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <label className="form-label" htmlFor="typePasswordX">
                    Password
                  </label>
                </div>

                <button
                  className="btn btn-outline-light btn-lg px-5"
                  onClick={() => onLogin(username, password)}
                >
                  Login
                </button>
                <p className="mb-0">
                  Don't have an account?{" "}
                  <Link className="text-white-50 fw-bold" to="/Signup">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};