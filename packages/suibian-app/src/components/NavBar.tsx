//app components
import React, { Component } from "react";

//other components
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";

//css
import "../css/NavBar.css";
import suibianLogo from "../images/suibian_full_logo_white.png";

type NavBarProp = {
  backPage?: string;
};

class NavBar extends Component<NavBarProp> {
  render() {
    let backLink = "/";
    if (this.props.backPage) {
      backLink = "/" + this.props.backPage;
    }

    return (
      <>
        <div className="navbar flex-container flex-row flex-center-v">
          <Link
            to={backLink}
            className="navbar-back-icon-container flex-container flex-center-v flex-center-h"
          >
            <Icon fontSize="large">keyboard_arrow_left</Icon>
          </Link>

          <div className="navbar-logo-container flex-container flex-center-h">
            <img
              className="navbar-logo"
              src={suibianLogo}
              alt="Suibian's logo in white."
            ></img>
          </div>
        </div>
      </>
    );
  }
}

export default NavBar;
