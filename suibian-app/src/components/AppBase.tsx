import React, { Component } from "react";
import "../css/AppBase.css";
import logo from "../images/logo.svg";
import suibian_logo from "../images/suibian_logo.png";
import HomePage from "./HomePage";
import { Icon } from "@material-ui/core";

class AppBase extends Component {
  render() {
    return (
      <React.Fragment>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        <div className="main-container">
          <div className="appbase-container">
            <div className="appbase-backicon">
              <p>
                <Icon>keyboard_arrow_left</Icon>
              </p>
            </div>

            <div className="appbase-logo">
              <img src={suibian_logo} height="80%"></img>
            </div>

            <div className="appbase-backicon">
              <p>
                <Icon>keyboard_arrow_right</Icon>
              </p>
            </div>
          </div>

          <div className="page-container">
            <HomePage />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AppBase;
