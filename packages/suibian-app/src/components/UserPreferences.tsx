import React, { Component, useState } from "react";
import "../css/UserPreferences.css";
import { Switch } from "@material-ui/core";
import NavBar from "./NavBar";
import { PreferenceItem } from "./PreferenceItem";

const preferences: Array<Preference> = [
  { type: "Halal" },
  { type: "Vegetarian" },
  { type: "Vegan" },
  { type: "Bhuddhist" }
];

const preferencesList = preferences.map(preference => (
  <PreferenceItem preference={preference} />
));

class UserPreferences extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <div className="navbar-container">
            <NavBar />
          </div>

          <div className="page-container user-preference-container">
            <h1>User Preferences</h1>
            {preferencesList}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserPreferences;
