import React from "react";

import Welcome from "./components/Welcome";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import { Route } from "react-router-dom";

const Routes = () => (
  <>
    <PublicRoutes />
    <PrivateRoutes />
  </>
);

const PublicRoutes = () => (
  <>
    <Route path="/login" component={Login} />
    <Route path="/sign-up" component={Register} />
  </>
);

const PrivateRoutes = () => <PrivateRoute path="/" component={Welcome} />;

export default Routes;
