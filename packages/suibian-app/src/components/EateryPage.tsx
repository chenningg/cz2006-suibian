//app components
import React, { Component } from "react";
import NavBar from "./NavBar";
import { Position, Result, Eatery } from "@suibian/commons";
import StallList from "./StallList";
import GoogleMap from "./GoogleMap";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";
import axios from "axios";

//css
import "../css/EateryPage.css";

type OwnProps = {
  history: any;
  match: any;
};

type StateProps = {
  result: Result;
};

type Props = StateProps & OwnProps;

// TODO: Remove default props
class EateryPage extends Component<Props> {
  // Variables
  state = {
    ready: false
  };

  eatery: Eatery = this.props.result.eatery[
    this.props.match.params.eatery_index
  ];

  // Methods
  checkReady = () => {
    return this.eatery ? true : false;
  };

  getLocation = (postalCode: string): Position => {
    const locationObj = axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=AIzaSyDEaux00JCnvfiaqExfJHY5cu-oe8fSOxA`
    );
    console.log(locationObj);
    return { longitude: 1, latitude: 2 };
  };

  render() {
    return this.checkReady() ? (
      <>
        <NavBar backPage="result" />
        <div className="eatery-page">
          <div className="app-content flex-container flex-col flex-center-v">
            <h1 className="eatery-name">{this.eatery.name}</h1>
            <GoogleMap />
            <a
              href={`https://www.google.com/maps/@${this.getLocation(
                this.eatery.location
              ).latitude.toString()},${this.getLocation(
                this.eatery.location
              ).longitude.toString()},15z`}
              className="google-maps-button"
            >
              View in Maps
            </a>
            <StallList stalls={this.eatery.stalls} />
          </div>
        </div>
      </>
    ) : (
      <div>Hello!</div>
    );
  }
}

// Redux functions
const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    result: state.result
  };
};

export default connect(mapStateToProps)(EateryPage);
