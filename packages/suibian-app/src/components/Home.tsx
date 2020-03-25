import React, { Component } from "react";
import "../css/Home.css";
import suibian_home_logo from "../images/suibian_full_logo.png";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <>
        <div className="home">
          <div className="app-content flex-container flex-col flex-height-100 flex-center-v flex-center-h text-center">
            <figure>
              <img className="suibian-logo" src={suibian_home_logo}></img>
            </figure>
            <div className="main-menu flex-container flex-col flex-spaced-evenly flex-center-h">
              <Link
                to="/createroom"
                className="main-menu-button remove-text-decoration center"
              >
                CREATE ROOM
              </Link>
              <Link
                to="/joinroom"
                className="main-menu-button remove-text-decoration center"
              >
                JOIN ROOM
              </Link>
            </div>
            <Link
              to="/userpreferences"
              className="user-prefs remove-text-decoration center"
            >
              User preferences
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
