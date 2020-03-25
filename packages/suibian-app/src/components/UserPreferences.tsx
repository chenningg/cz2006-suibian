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

class UserPreferences extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="main-container">
          <div className="navbar-container">
            <NavBar />
          </div>

          <div className="page-container user-preference-container">
            {/* <h1>User Preferences</h1> */}

            <PreferenceItem preference={preferences[0]} />
            <PreferenceItem preference={preferences[1]} />
            <PreferenceItem preference={preferences[2]} />
            <PreferenceItem preference={preferences[3]} />
            <PreferenceItem preference={preferences[0]} />
            <PreferenceItem preference={preferences[1]} />
            <PreferenceItem preference={preferences[2]} />
            <PreferenceItem preference={preferences[3]} />
            <PreferenceItem preference={preferences[2]} />
            <PreferenceItem preference={preferences[3]} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default UserPreferences;
