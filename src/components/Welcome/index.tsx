import React from "react";

import Navigation from "../common/Navigation";
import Chat from "./Chat";

import "./Welcome.scss";

const Welcome = () => (
  <div className="welcome-page">
    <div className="container">
      <Navigation />
      <Chat />
    </div>
  </div>
);

export default Welcome;
