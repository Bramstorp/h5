import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { NotFound } from "./NotFound";
import { Layout } from "./layout/layout";

import { Dashboard } from "./modules/Dashboard/Dashboard"
import { Login } from "./modules/Login/Login"
import { Signup } from "./modules/Signup/Signup"
import { Usersite } from "./modules/Usersite/Usersite"
import { AuthenticationContextProvider } from "./service/authentication/authentication.context";


function App() {
  return (
    <AuthenticationContextProvider>
      <Layout>
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route element={<Usersite />} exact path="/user" />
          <Route element={<NotFound />} />
        </Routes>
      </Layout>
    </AuthenticationContextProvider>
  );
}

export default App;