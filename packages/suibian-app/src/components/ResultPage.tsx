//app components
import React, { Component } from "react";
import NavBar from "./NavBar";

//other components
import EateriesList from "./EateriesList";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";
import TopFoodsList from "./TopFoodsList";

// Types
import { Result } from "@suibian/commons";

//css
import "../css/ResultPage.css";

type OwnProps = {
  history: any;
};

type StateProps = {
  result: Result;
};

type Props = StateProps & OwnProps;

class ResultsPage extends Component<Props> {
  // Methods
  render() {
    return (
      <>
        <NavBar />
        <div className="result-page">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <div className="result-list-container flex-container flex-col">
              <h1 className="title">Top Food</h1>
              <TopFoodsList result={this.props.result} />
            </div>
            <div className="result-list-container flex-container flex-col">
              <h1 className="title">Places To Go</h1>
              <EateriesList
                result={this.props.result}
                history={this.props.history}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

// Redux functions
const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    result: state.result
  };
};

export default connect(mapStateToProps)(ResultsPage);
