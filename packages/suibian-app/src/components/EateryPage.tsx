//app components
import React, { Component } from "react";
import NavBar from "./NavBar";
import { Eatery } from "@suibian/commons";
import StallList from "./StallList";
import GoogleMap from "./GoogleMap";

//css
import "../css/EateryPage.css";

type OwnProps = {
  history: any;
  match: any;
};

type StateProps = {
  eatery: Eatery;
};

type Props = StateProps & OwnProps;

// This is an Eatery. REMOVE THIS BEFORE BUILDING.
const fakeProps = {
  // State
  name: "Old Airport Rd",
  location: {
    latitude: 47.611036,
    longitude: -93.615641
  },
  stalls: [
    {
      name: "Ah Huat Fishball Noodle",
      food: [
        {
          foodname: "Fishball Noodle",
          foodId: "fishball-noodle",
          imageurl: "https://i.imgur.com/nzpIjN0.jpeg"
        },
        {
          foodname: "Fishball Soup",
          foodId: "fishball-soup",
          imageurl: "https://i.imgur.com/fybEA24.jpeg"
        },
        {
          foodname: "Fishball Soup",
          foodId: "fishball-soup",
          imageurl: "https://i.imgur.com/fybEA24.jpeg"
        },
        {
          foodname: "Fishball Soup",
          foodId: "fishball-soup",
          imageurl: "https://i.imgur.com/fybEA24.jpeg"
        },
        {
          foodname: "Fishball Soup",
          foodId: "fishball-soup",
          imageurl: "https://i.imgur.com/fybEA24.jpeg"
        },
        {
          foodname: "Fishball Soup",
          foodId: "fishball-soup",
          imageurl: "https://i.imgur.com/fybEA24.jpeg"
        },
        {
          foodname: "Fishball Soup",
          foodId: "fishball-soup",
          imageurl: "https://i.imgur.com/fybEA24.jpeg"
        },
        {
          foodname: "Fishball Soup",
          foodId: "fishball-soup",
          imageurl: "https://i.imgur.com/fybEA24.jpeg"
        }
      ]
    },
    {
      name: "Wang's Yong Tau Fu",
      food: [
        {
          foodname: "Yong Tau Fu",
          foodId: "yong-tau-fu",
          imageurl: "https://i.imgur.com/nzpIjN0.jpeg"
        }
      ]
    },
    {
      name: "Drinks with Ah Tee",
      food: [
        {
          foodname: "Milo",
          foodId: "milo",
          imageurl: "https://i.imgur.com/d6khwx1.jpg"
        },
        {
          foodname: "Teh Bing",
          foodId: "teh-bing",
          imageurl: "https://i.imgur.com/zXj4ZMg.jpg"
        }
      ]
    }
  ]
};

// TODO: Remove default props
class EateryPage extends Component<Props> {
  static defaultProps = { eatery: fakeProps };

  // Methods
  render() {
    return (
      <>
        <NavBar backPage="results" />
        <div className="eatery-page">
          <div className="app-content flex-container flex-col flex-center-v">
            <h1 className="eatery-name">
              {this.props.match.params.eatery_name}
            </h1>
            <GoogleMap />
            <a
              href={`https://www.google.com/maps/@${this.props.eatery.location.latitude},${this.props.eatery.location.longitude},15z`}
              className="google-maps-button"
            >
              View in Maps
            </a>
            <StallList stalls={this.props.eatery.stalls} />
          </div>
        </div>
      </>
    );
  }
}

export default EateryPage;
