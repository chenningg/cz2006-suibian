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
  {
    header: "Albert Food Centre",
    text1: "Bak Chor Mee",
    text2: "Prawn Noodles"
  },
  { header: "Bugis Food Centre", text1: "Bak Chor Mee", text2: "Chicken Rice" },
  {
    header: "Chinatown Food Centre",
    text1: "Bak Chor Mee",
    text2: "Kway Chap"
  },
  { header: "Old Airport Rd", text1: "Bak Chor Mee", text2: "Satay" },
  { header: "Lau Pa Sat", text1: "Bak Chor Mee", text2: "Nasi Lemak" }
];

class RecommendationsPage extends Component<Props> {
  // Methods
  render() {
    return (
      <>
        <NavBar />
        <div className="recommendations-page">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h1 className="title">Recommendations</h1>
            <div className="recommendation-list-container flex-container flex-col">
              <RecommendationList
                recommendations={fakeProps}
                history={this.props.history}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default RecommendationsPage;
