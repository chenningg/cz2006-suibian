import React, { Component } from "react";
import "../css/PageBase.css";
import "../css/UserPreferences.css";
import { Switch } from "@material-ui/core";
import NavBar from "./NavBar";

class UserPreferences extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <NavBar />

          <div className="page-container preference-container">
            <h1>User Preferences</h1>
            <div className="preference">
              <p>Halal</p>
              <p>
                <Switch></Switch>
              </p>
            </div>
            <div className="preference">
              <p>Vegetarian</p>
              <p>
                <Switch></Switch>
              </p>
            </div>
            <div className="preference">
              <p>Vegan</p>
              <p>
                <Switch></Switch>
              </p>
            </div>
            <div className="preference">
              <p>Bhuddhist</p>
              <p>
                <Switch></Switch>
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserPreferences;
