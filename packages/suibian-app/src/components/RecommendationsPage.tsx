//app components
import React, { Component } from "react";
import NavBar from "./NavBar";

//other components
//import Card from "react-bootstrap/Card";
import RecommendationList from "./RecommendationList";

// Types
import { Recommendation } from "@suibian/commons";

//css
import "../css/RecommendationsPage.css";

type OwnProps = {
  history: any;
};

type StateProps = {
  recommendations: Recommendation[];
};

type DispatchProps = {
  updateRecommendations: (recommendations: Recommendation[]) => void;
};

type Props = StateProps & DispatchProps & OwnProps;

// TO DELETE
const fakeProps = [
  { header: "Albert Food Centre", text1: "food1", text2: "food2" },
  { header: "Bugis Food Centre", text1: "food3", text2: "food4" },
  { header: "Chinatown Food Centre", text1: "food5", text2: "food6" }
];

class RecommendationsPage extends Component<Props> {
  // Methods
  render() {
    return (
      <>
        <NavBar />
        <div className="recommendation">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h2 style={{ margin: 40, fontSize: "2rem" }}>Recommendations</h2>
            <div className="recommendation-list-container flex-container flex-col">
              <RecommendationList recommendations={fakeProps} />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default RecommendationsPage;
