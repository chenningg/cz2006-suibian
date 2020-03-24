import React, { Component } from "react";
import "../css/PageBase.css";
import { Icon } from "@material-ui/core";
import NavBar from "./NavBar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";

class JoinRoom extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <div className="navbar-container">
            <NavBar />
          </div>

          <div className="page-container">
            <h1>JoinRoom</h1>
          </div>
        </div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <button
          type="button"
          className="standard-button red-button fixed-button"
        >
          <Link to="/roompagejoin" className="red-button-hyperlink-stripped">
            Join Room
          </Link>
        </button>
      </div>
    </React.Fragment>
  );
}

export default JoinRoom;
