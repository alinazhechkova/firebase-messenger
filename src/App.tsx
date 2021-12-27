import React from "react";
import Routes from "./Routes";

import "./App.css";
import { Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Routes />
    </Switch>
  );
}

export default App;
