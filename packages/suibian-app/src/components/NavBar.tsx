import React, { Component } from "react";
import "../css/NavBar.css";
import suibianLogo from "../images/suibian_full_logo_white.png";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <>
        <div className="navbar flex-container flex-row flex-center-v">
          <Link
            to="/home"
            className="navbar-back-icon-container flex-container flex-center-v flex-center-h"
          >
            <Icon fontSize="large">keyboard_arrow_left</Icon>
          </Link>

          <Link
            className="navbar-logo-container flex-container flex-center-h"
            to="/home"
          >
            <img className="navbar-logo" src={suibianLogo}></img>
          </Link>
        </div>
      </>
    );
  }
}

export default NavBar;
