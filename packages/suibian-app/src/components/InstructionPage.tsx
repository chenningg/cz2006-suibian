//app components
import React, { Component } from "react";
import NavBar from "./NavBar";

//other components
import { Favorite, Block } from "@material-ui/icons";
import Loader from "react-loader-spinner";
import { Link, withRouter } from "react-router-dom";
import { Food } from "@suibian/commons";

//css
import "../css/InstructionPage.css";

// Sockets and Redux
import { SocketState } from "../types/SocketState";
import { suibianSocketClient } from "@suibian/commons";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";

// Types
type OwnProps = {
  history: any;
  location: any;
  match: any;
  foods: any;
};

type StateProps = {
  socketState: SocketState;
};

type DispatchProps = {
  updateSocketState: (
    key: string,
    value: string | number | suibianSocketClient
  ) => void;
};

type Props = StateProps & DispatchProps & OwnProps;

const styles = {
  largeIcon: {
    width: 100,
    height: 100
  },
  mediumIcon: {
    width: 50,
    height: 50
  }
};

class InstructionPage extends Component<Props> {
  // state
  state = {
    foods: []
  };

  //methods
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        //temp, supposed to get from database
        foods: [
          {
            foodName: "Bak Chor Mee",
            foodID: "123",
            imgurl:
              "https://www.linsfood.com/wp-content/uploads/2017/02/Bak-Chor-Mee.jpg"
          },
          {
            foodName: "Chicken Rice",
            foodID: "456",
            imgurl:
              "https://www.thespruceeats.com/thmb/ltMha1iXJIttnXv9EDQf9WFSrEE=/3896x2922/smart/filters:no_upscale()/hainanese-chicken-rice-very-detailed-recipe-3030408-hero-0a742f08c72044e999202a44e30a1ea7.jpg"
          },
          {
            foodName: "Burrito",
            foodID: "789",
            imgurl:
              "https://www.thespruceeats.com/thmb/Hn65vI6v55aIBCwMQaf0SWcVLYI=/2048x1360/filters:fill(auto,1)/vegetarian-bean-and-rice-burrito-recipe-3378550-9_preview-5b2417e1ff1b780037a58cda.jpeg"
          }
        ] as Food[]
      });
    }, 5000);
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="instruction-page">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h1>Before we begin...</h1>

            <div className="vote-button-container">
              <div className="vote-button">
                <p>
                  <Favorite className="like" style={styles.largeIcon} />
                </p>
                <p>Sedaaaap!</p>
                <p>
                  Everyone needs to try this <b>NOW</b>
                </p>
              </div>
              <div></div>
              <div className="vote-button">
                <p>
                  <Block className="dislike" style={styles.largeIcon} />
                </p>
                <p>Ewww no!</p>
                <p>
                  No one should <b>EVER</b> eat this
                </p>
              </div>
            </div>

            <br />
            <div className="loading-container">
              <div
                className="loader"
                hidden={this.state.foods.length == 0 ? false : true}
              >
                <Loader
                  type="ThreeDots"
                  color="#c92c2c"
                  height="100"
                  width="100"
                />
              </div>

              <Link
                hidden={this.state.foods.length == 0 ? true : false}
                to="/votepage"
                className="main-menu-button remove-text-decoration center"
              >
                <button>LET'S GO!</button>
              </Link>
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
    socketState: state.socketState
  };
};

export default withRouter(connect(mapStateToProps)(InstructionPage));
