import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./context/Provider";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
