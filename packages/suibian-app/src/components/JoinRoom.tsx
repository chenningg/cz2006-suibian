//app components
import React, { Component, FormEvent, ChangeEvent } from "react";
import NavBar from "./NavBar";

//css
import "../css/JoinRoom.css";
import { withRouter } from "react-router-dom";

// Sockets and Redux
import { SocketState } from "../types/SocketState";
import { suibianSocketClient } from "@suibian/commons";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";
import { User } from "@suibian/commons";

// Types
type OwnProps = {
  history: any;
  location: any;
  match: any;
};

type StateProps = {
  socketState: SocketState;
  user: User;
};

type DispatchProps = {
  updateSocketState: (
    key: string,
    value: string | number | suibianSocketClient
  ) => void;
  updateUser: (key: string, value: string) => void;
};

type Props = StateProps & DispatchProps & OwnProps;

class JoinRoom extends Component<Props> {
  // Methods
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case "username":
        this.props.updateUser("username", e.target.value);
        break;
      case "roomCode":
        this.props.updateSocketState("roomCode", e.target.value);
        break;
    }
  };

  // Function to handle joining room after submission of details
  joinRoom = (e: FormEvent) => {
    e.preventDefault();
    console.log("Joining room...");
    if (this.props.socketState.socket) {
      this.props.socketState.socket.emit("joinRoom", {
        roomCode: this.props.socketState.roomCode,
        user: this.props.user
      });

      // Redirect to room lobby
      this.props.history.push("/roomlobby");
    }
  };

  render() {
    return (
      <>
        <NavBar />
        <div className="join-room">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h1 className="title">Join room</h1>
            <form className="join-room-form" onSubmit={this.joinRoom}>
              <input
                type="text"
                onChange={this.handleChange}
                id="roomCode"
                placeholder="Room code"
                className="username-input"
                autoComplete="off"
                required
              />
              <br></br>
              <input
                type="text"
                onChange={this.handleChange}
                id="username"
                placeholder="Username"
                className="username-input"
                autoComplete="off"
                required
              />
              <br></br>
              <button>JOIN ROOM</button>
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
    socketState: state.socketState,
    user: state.user
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
    },
    updateUser: (key, value) => {
      dispatch({
        type: "UPDATE_USER",
        key: key,
        value: value
      });
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(JoinRoom)
);
