import React, { Component } from "react";
import "../css/NavBar.css";
import suibian_logo from "../images/suibian_logo.png";
import { Icon } from "@material-ui/core";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="navbar-backicon">
          <p>
            <Link to="/home">
              <Icon>keyboard_arrow_left</Icon>
            </Link>
          </p>
        </div>

        <div className="navbar-logo">
          <Link to="/home">
            <img src={suibian_logo} height="80%"></img>
          </Link>
        </div>

        <div className="navbar-backicon">
          <p></p>
        </div>
      </div>
    );
  }
}

export default NavBar;
