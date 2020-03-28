//app components
import React, { Component } from "react";

//other components
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";

//css
import "../css/NavBar.css";
import suibianLogo from "../images/suibian_full_logo_white.png";

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

          <div className="navbar-logo-container flex-container flex-center-h">
            <Link to="/home">
              <img
                className="navbar-logo"
                src={suibianLogo}
                alt="Suibian's logo in white."
              ></img>
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default NavBar;
