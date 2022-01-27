import React, { useContext } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import { NotFound } from "./NotFound";
import { Layout } from "./layout/layout";

import { Home } from "./modules/Home/Home"
import { Dashboard } from "./modules/Dashboard/Dashboard"
import { Login } from "./modules/Login/Login"
import { Signup } from "./modules/Signup/Signup"
import { Usersite } from "./modules/Usersite/Usersite"
import { AuthenticationContextProvider } from "./service/authentication/authentication.context";

import { PrivateRoute } from './auth/PrivateRoute'
import { AdminRoute } from './auth/AdminRoute'

function App() {
    return ( 
      <BrowserRouter basename={"/"}>
        <AuthenticationContextProvider>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <AdminRoute exact path="/dashboard" component={Dashboard} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/user" component={Usersite} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </AuthenticationContextProvider>
      </BrowserRouter>
    );
}

export default App;