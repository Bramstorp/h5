import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../service/authentication/authentication.context";

export const Navbar = () => {
  const { onSignout, isAuthenticated } = useContext(AuthenticationContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
      <div className="container">
        <a className="navbar-brand" href="/">
            Car Wash
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Dashboard">
                Dashboard
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {
                isAuthenticated() ? <a href="#" className="nav-link" onClick={() => onSignout()} >Logout</a> : <Link className="nav-link" to="/Login">Login</Link>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
