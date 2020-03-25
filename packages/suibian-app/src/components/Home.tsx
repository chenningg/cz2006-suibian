import React, { Component } from "react";
import "../css/Home.css";
import suibian_home_logo from "../images/suibian_full_logo.png";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="app-content">
        <div className="flex-container flex-height-v-100 flex-center-v flex-center-h ">
          <div className="flex-child flex-col home-content text-center">
            <figure>
              <img className="suibian-logo" src={suibian_home_logo}></img>
            </figure>
            <div className="main-menu flex-container flex-col flex-spaced-evenly flex-center-h">
              <Link
                to="/createroom"
                className="main-menu-button link remove-text-decoration center"
              >
                CREATE ROOM
              </Link>
              <Link
                to="/joinroom"
                className="main-menu-button link remove-text-decoration center"
              >
                JOIN ROOM
              </Link>
              <Link
                to="/userpreferences"
                className="link remove-text-decoration center"
              >
                User Preferences
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
