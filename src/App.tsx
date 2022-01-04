import React from "react";

import { Redirect, Switch } from "react-router-dom";
import Routes from "./Routes";

import "./stylesheets/style.scss";

const App = () => (
  <Switch>
    <Routes />
    <Redirect to="/" />
  </Switch>
);

export default App;
