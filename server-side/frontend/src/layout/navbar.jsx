import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "../service/authentication/authentication.context";
import { isAuthenticated, isAdmin } from "../auth/auth"


export const Navbar = () => {
  const { onSignout, user } = useContext(AuthenticationContext);
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
      <div className="container">
        <a className="navbar-brand">
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
            {user && user.is_admin ? (
              <li className="nav-item">
                <Link className="nav-link" to="/Dashboard">
                  Dashboard
                </Link>
              </li>
            ) : (
              ""
            )}
            {user ? (
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  Usersite
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              {isAuthenticated() ? (
                <a
                  href="/user"
                  className="nav-link"
                  onClick={() => onSignout()}
                >
                  Logout
                </a>
              ) : (
                <Link className="nav-link" to="/">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
