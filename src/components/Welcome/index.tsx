import React from "react";

import Navigation from "../common/Navigation";
import ChatList from "./ChatList";

import "./Welcome.scss";

const Welcome = () => (
  <div className="welcome-page">
    <div className="container">
      <Navigation />
      <ChatList />
    </div>
  </div>
);

export default Welcome;
