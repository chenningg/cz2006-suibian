//app components
import React, { Component, FormEvent, ChangeEvent } from "react";
import NavBar from "./NavBar";

//other components
import { Link } from "react-router-dom";

//css
import "../css/JoinRoom.css";

// Sockets and Redux
import * as SocketTypes from "../types/SocketState";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";

// Types
type StateProps = {
  socketState: SocketTypes.SocketState;
};

type DispatchProps = {
  updateSocketState: (
    key: string,
    value: string | number | SocketTypes.SuibianSocket
  ) => void;
};

type Props = StateProps & DispatchProps;

class JoinRoom extends Component<Props> {
  // Methods
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.updateSocketState(e.target.id, e.target.value);
  };

  joinRoom = (e: FormEvent) => {
    e.preventDefault();
    console.log("Joining room...");
    if (this.props.socketState.socket) {
      this.props.socketState.socket.emit("joinRoom", {
        username: this.props.socketState.username,
        roomCode: this.props.socketState.roomCode
      });
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
              {/* <Link to="/roomlobby" className="join-room-text"> */}
              <button>JOIN ROOM</button>
              {/* </Link> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(JoinRoom);
