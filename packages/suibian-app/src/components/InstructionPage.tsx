//app components
import React, { Component } from "react";
import NavBar from "./NavBar";

//other components
import { Favorite, Block } from "@material-ui/icons";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

//css
import "../css/InstructionPage.css";

// Sockets and Redux
import { SocketState } from "../types/SocketState";

// Types
type StateProps = {
  socketState: SocketState;
  foods: any;
};

type Props = StateProps;

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
  state = {
    ready: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ready: true });
    }, 1500);
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
              <div className="loader" hidden={this.state.ready}>
                <Loader type="ThreeDots" color="#c92c2c" />
              </div>

              <Link
                to="/votepage"
                className="main-menu-button remove-text-decoration center"
                hidden={!this.state.ready}
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

export default InstructionPage;
