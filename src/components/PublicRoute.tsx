import React from "react";
import { Route, RouteProps } from "react-router-dom";

const PublicRoute = ({ path, exact, component, children }: RouteProps) => (
  <Route path={path} exact={exact} component={component}>
    {children}
  </Route>
);

export default PublicRoute;
