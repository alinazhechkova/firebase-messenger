import React from "react";

import { Redirect, Switch } from "react-router-dom";
import Routes from "./Routes";

import "./App.css";

const App = () => (
  <Switch>
    <Routes />
    <Redirect to="/" />
  </Switch>
);

export default App;
