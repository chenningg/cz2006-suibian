import React, { Component } from "react";
import "../css/PageBase.css";
import { Icon } from "@material-ui/core";
import NavBar from "./NavBar";

class CreateRoom extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <div className="navbar-container">
            <NavBar />
          </div>

          <div className="page-container">
            <h1>CreateRoom</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default CreateRoom;
