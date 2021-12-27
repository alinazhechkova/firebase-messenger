import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { MessengerContext } from "../Provider";

const PrivateRoute = ({ path, exact, component, children }: RouteProps) => {
  const { currentUser } = useContext<any>(MessengerContext);

  return (
    <>
      {currentUser ? (
        <Route path={path} exact={exact} component={component}>
          {children}
        </Route>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
