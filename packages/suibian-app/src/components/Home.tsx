import React, { Component } from "react";
import "../css/Home.css";
import suibian_home_logo from "../images/suibian_full_logo.png";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer">
          <img src={suibian_home_logo}></img>
        </div>
        <div className="spacer"></div>

        <div className="spacer">
          <button type="button" className="standard-button red-button">
            <Link to="/createroom" className="red-button-hyperlink-stripped">
              CREATE ROOM
            </Link>
          </button>
        </div>

        <div className="spacer">
          <button type="button" className="standard-button red-button">
            <Link to="/joinroom" className="red-button-hyperlink-stripped">
              JOIN ROOM
            </Link>
          </button>
        </div>

        <div className="spacer"></div>
        <div className="spacer"></div>

        <div className="spacer home-preferences">
          <button type="button" className="standard-button small-button-text">
            <Link
              to="/userpreferences"
              className="standard-button-hyperlink-stripped "
            >
              <span className="underline">User Preferences</span>
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
