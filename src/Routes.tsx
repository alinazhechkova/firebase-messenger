import React from "react";

import Welcome from "./components/Welcome";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

const Routes = () => {
  return (
    <>
      <PublicRoutes />
      <PrivateRoutes />
    </>
  );
};

const PublicRoutes = () => (
  <>
    <PublicRoute path="/login" component={Login} />
    <PublicRoute path="/sign-up" component={Register} />
  </>
);

const PrivateRoutes = () => (
  <>
    <PrivateRoute path="/" component={Welcome} />
  </>
);

export default Routes;
