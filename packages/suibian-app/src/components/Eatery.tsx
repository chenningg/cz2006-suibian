import React, { Component } from "react";
import NavBar from "./NavBar";
import "../css/Eatery.css";

class Eatery extends Component {
  //State
  eateryname = "Albert Food Centre";
  foodstall = "Hock Lee Fishball Noodle";

  render() {
    return (
      <>
        <NavBar />
        <div className="eatery">
          <div className="app-content flex-container flex-col  flex-center-v">
            <h2 className="eateryname">{this.eateryname}</h2>
            <div className="map">
              <img
                className="location"
                style={{ alignContent: "center" }}
                src="https://picsum.photos/id/1025/350/350"
              />
            </div>
            <a
              href="https://www.google.com/maps/@${your_lat},${your_lng},${your_desired_zoom}z"
              className="gmaps-button"
            >
              View in Maps
            </a>

            <text className="foodstall-name">{this.foodstall}</text>
            <img
              className="foodstall"
              src="https://picsum.photos/id/1062/350/200"
            ></img>
            <text className="address">
              #01-94 Albert Centre Market &amp; Food Centre
            </text>
          </div>
        </div>
      </>
    );
  }
}
export default Eatery;
