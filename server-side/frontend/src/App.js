import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { NotFound } from "./NotFound";
import { Layout } from "./layout/layout";

import { Dashboard } from "./modules/Dashboard/Dashboard"
import { Login } from "./modules/Login/Login"
import { Signup } from "./modules/Signup/Signup"
import { Usersite } from "./modules/Usersite/Usersite"
import { AuthenticationContextProvider } from "./service/authentication/authentication.context";

function App() {
    return ( 
      <BrowserRouter basename={"/"}>
        <AuthenticationContextProvider>
          <Layout>
            <Switch>
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route component={Usersite} exact path="/user" />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </AuthenticationContextProvider>
      </BrowserRouter>
    );
}

export default App;