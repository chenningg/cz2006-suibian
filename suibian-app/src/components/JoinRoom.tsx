import React, { Component } from "react";
import "../css/PageBase.css";
import { Icon } from "@material-ui/core";
import NavBar from "./NavBar";

class JoinRoom extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <NavBar />

          <div className="page-container">
            <h1>JoinRoom</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default JoinRoom;
