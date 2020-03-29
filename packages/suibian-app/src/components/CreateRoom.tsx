//app components
import React, { Component, ChangeEvent, FormEvent } from "react";
import NavBar from "./NavBar";

//other components
import { withRouter } from "react-router-dom";

//css
import "../css/CreateRoom.css";

// Sockets and Redux
import * as SocketTypes from "../types/SocketState";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";
import { findlatlng } from "../functions/findlatlng";

// Types
type OwnProps = {
  history: any;
  location: any;
  match: any;
};

type StateProps = {
  socketState: SocketTypes.SocketState;
};

type DispatchProps = {
  updateSocketState: (
    key: string,
    value: string | number | SocketTypes.SuibianSocket
  ) => void;
};

type Props = StateProps & DispatchProps & OwnProps;

class CreateRoom extends Component<Props> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.updateSocketState("username", e.target.value);
  };

  // Function to handle creating room
  createRoom = (e: FormEvent) => {
    e.preventDefault();
    if (this.props.socketState.socket) {
      this.props.socketState.socket.emit("createRoom", {
        username: this.props.socketState.username
      });

      // Redirect to room lobby after creating room
      this.props.history.push("/roomlobby");
    }
  };

  render() {
    return (
      <>
        <NavBar />
        <div className="create-room">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h1 className="title">Create room</h1>
            <form className="create-room-form" onSubmit={this.createRoom}>
              <input
                onChange={this.handleChange}
                id="username"
                placeholder="Username"
                className="username-input"
                autoComplete="off"
                required
              />
              <br></br>
              <button>CREATE ROOM</button>
            </form>
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

// Links a dispatch function to a prop
const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    updateSocketState: (key, value) => {
      dispatch({
        type: "UPDATE_SOCKET_STATE",
        key: key,
        value: value
      });
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateRoom)
);
