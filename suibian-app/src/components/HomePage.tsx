import React, { Component } from "react";
import "../css/HomePage.css";
import "../css/AppBase.css";
import suibian_homepage_logo from "../images/suibian_homepage_logo.png";
import { Button } from "@material-ui/core";

class HomePage extends Component {
  render() {
    return (
      <div className="homepage-container">
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer">
          <div className="appbase-logo">
            <img src={suibian_homepage_logo}></img>
          </div>
        </div>
        <div className="spacer"></div>

        <div className="spacer">
          <button type="button" className="standard-button red-button">
            Create Room
          </button>
        </div>

        <div className="spacer">
          <button type="button" className="standard-button red-button">
            Join Room
          </button>
        </div>

        <div className="spacer"></div>
        <div className="spacer"></div>

        <div className="spacer homepage-preferences">
          <button type="button" className="standard-button small-button-text">
            User Preferences
          </button>
        </div>
      </div>
    );
  }
}

export default HomePage;
