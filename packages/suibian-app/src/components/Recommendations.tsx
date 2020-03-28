//app components
import React, { Component } from "react";
import NavBar from "./NavBar";

//other components
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

//css
import "../css/Recommendations.css";

class Recomendations extends Component {
  //State?
  numVotes = 5;

  //Variables
  recommendations: Array<Recommendation> = [
    { header: "Albert Food Centre", text1: "food1", text2: "food2" },
    { header: "Bugis Food Centre", text1: "food3", text2: "food4" },
    { header: "Chinatown Food Centre", text1: "food5", text2: "food6" }
  ];

  recommendationlist = this.recommendations.map(recommendation => (
    <div
      className="recommendation flex-container flex row flex-spaced-between"
      key={recommendation.header}
    >
      <button className="button">
        <Link
          to="/eatery"
          className="eatery-info"
          style={{ textDecoration: "none" }}
        >
          <Card className="card" border="light">
            {/* <Card.Header></Card.Header> */}
            <Card.Body>
              <Card.Title>
                <h4 style={{ paddingTop: 10 }}>{recommendation.header}</h4>
              </Card.Title>
              <Card.Text>
                <ul>
                  <li>{recommendation.text1}</li>
                  <br />
                  <li>{recommendation.text2}</li>
                </ul>
                <span className="numlikes">
                  {this.numVotes.toString()} friends liked this.
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </button>
    </div>
  ));

  //methods
  render() {
    return (
      <>
        <NavBar />
        <div className="recommendations">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h2 style={{ margin: 40, fontSize: "2rem" }}>Recommendations</h2>
            <div className="recommendations-list flex container flex-col flex center-v flex-spaced-around">
              {this.recommendationlist}
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Recomendations;
