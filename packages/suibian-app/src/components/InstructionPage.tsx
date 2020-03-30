//app components
import React, { Component } from "react";
import NavBar from "./NavBar";

//other components
import { Favorite, Block } from "@material-ui/icons";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Food } from "@suibian/commons";

//css
import "../css/InstructionPage.css";

// Sockets and Redux
import { SocketState } from "../types/SocketState";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";

// Types
type OwnProps = {
  history: any;
  location: any;
  match: any;
};

type StateProps = {
  socketState: SocketState;
  foods: any;
};

type DispatchProps = {
  updateFoods: (foods: Food[]) => void;
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
  state = {
    ready: false
  };

  // Register socket to listen to events
  registerSocketListeners = () => {
    console.log(this.props.socketState.socket);
    if (this.props.socketState.socket) {
      console.log("Registering socket listeners...");

      // On start room event fire, I log my data
      this.props.socketState.socket.on("startRoom", (data: any) => {
        if (data) {
          this.props.updateFoods(data as Food[]);
          this.setState({ ready: true });
        } else {
          console.log(`Error! No data received from startRoom event.`);
        }
      });
    }
  };

  //methods
  componentDidMount() {
    this.registerSocketListeners();

    if (this.props.socketState.socket) {
      this.props.socketState.socket.emit("startRoom", {
        roomCode: this.props.socketState.roomCode
      });
    }
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

// Redux functions
const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    socketState: state.socketState,
    foods: state.foods
  };
};

// Links a dispatch function to a prop
const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    updateFoods: foods => {
      dispatch({
        type: "UPDATE_FOODS",
        foods: foods
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructionPage);
