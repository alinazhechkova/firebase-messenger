import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { RootState } from "../store/reducers";

const PrivateRoute = ({ path, exact, component, children }: RouteProps) => {
  const currentUser = useSelector((state: RootState) => state);

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
