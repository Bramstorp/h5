import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { NotFound } from "./NotFound";
import { Layout } from "./layout/layout";

import { Home } from "./modules/Home/Home"
import { Dashboard } from "./modules/Dashboard/Dashboard"
import { Login } from "./modules/Login/Login"

function App() {
    return ( 
      <BrowserRouter basename={"/"}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
}

export default App;