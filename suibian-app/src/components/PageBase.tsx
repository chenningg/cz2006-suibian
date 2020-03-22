// This file is for copying to create all sorts of pages!!!!!

import React, { Component } from "react";
import "../css/PageBase.css";
import { Icon } from "@material-ui/core";
import NavBar from "./NavBar";

class PageBase extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <NavBar />

          <div className="page-container"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default PageBase;
