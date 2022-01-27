import React from "react";
import { Navbar } from "./navbar";
import "bootstrap/dist/css/bootstrap.min.css"

export const Layout = (props) => (
  <div>
    <Navbar />
    <div className="container">{props.children}</div>
  </div>
);