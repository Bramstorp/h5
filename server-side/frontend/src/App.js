import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Layout } from "./layout/layout";

import { Dashboard } from "./modules/Dashboard/Dashboard"
import { Login } from "./modules/Login/Login"
import { Signup } from "./modules/Signup/Signup"
import { Usersite } from "./modules/Usersite/Usersite"
import { AuthenticationContextProvider } from "./service/authentication/authentication.context";

import { PrivateRoute } from "./auth/PrivateRoute"
import { RequireToken } from "./auth/auth"

function App() {
  return (
    <AuthenticationContextProvider>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<RequireToken> <Usersite /> </RequireToken>} />
          <Route element={<NotFound />} />
        </Routes>
      </Layout>
    </AuthenticationContextProvider>
  );
}

export default App;