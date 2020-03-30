//app components
import React, { Component } from "react";
import NavBar from "./NavBar";

//other components
import EateriesList from "./EateriesList";

// Types
import { Eatery } from "@suibian/commons";

//css
import "../css/RecommendationsPage.css";

type OwnProps = {
  history: any;
};

type StateProps = {
  eateries: Eatery[];
};

type Props = StateProps & OwnProps;

// TO DELETE
const fakeProps = [
  {
    name: "Albert Food Centre",
    location: { latitude: 123, longitude: 123 },
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
          }
        ]
      },
      {
        name: "Wang's Yong Tau Fu",
        food: [
          {
            foodname: "Yong Tau Fu",
            foodId: "yong-tau-fu",
            imageurl: "https://i.imgur.com/MU2dD8E.jpg"
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
  }
];

class ResultsPage extends Component<Props> {
  // Methods
  render() {
    return (
      <>
        <NavBar />
        <div className="recommendations-page">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <div className="recommendation-list-container flex-container flex-col">
              <h1 className="title">Top Food</h1>
            </div>
            <div className="recommendation-list-container flex-container flex-col">
              <h1 className="title">Places To Go</h1>
              <EateriesList
                topFoods={[]}
                eateries={fakeProps}
                history={this.props.history}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default ResultsPage;
