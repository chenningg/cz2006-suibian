import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./components/AppRouter";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById("root")
);
