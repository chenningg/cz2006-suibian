//app components
//@ts-ignore-file
import React, { Component } from "react";
import NavBar from "./NavBar";
import { Result, Eatery } from "@suibian/commons";
import StallList from "./StallList";
import GoogleMap from "./GoogleMap";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";

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

class EateryPage extends Component<Props> {
  // Variables
  state = {
    ready: false,
  };

  eatery: Eatery = this.props.result.eatery[
    this.props.match.params.eatery_index
  ];

  // Methods
  checkReady = () => {
    return this.eatery ? true : false;
  };

  render() {
    if (this.checkReady()) {
      return (
        <>
          <NavBar backPage="result" />
          <div className="eatery-page">
            <div className="app-content flex-container flex-col flex-center-v">
              <h1 className="eatery-name">{this.eatery.name}</h1>
              <GoogleMap
                label={this.eatery.name}
                center={{
                  lat: this.eatery.location.latitude,
                  lng: this.eatery.location.longitude,
                }}
                zoom={17}
              />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${this.eatery.location.latitude},${this.eatery.location.longitude}`}
                className="google-maps-button"
              >
                View in Maps
              </a>
              <StallList stalls={this.eatery.stalls} />
            </div>
          </div>
        </>
      );
    } else {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }
  }
}

// Redux functions
const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    result: state.result,
  };
};

export default connect(mapStateToProps)(EateryPage);
