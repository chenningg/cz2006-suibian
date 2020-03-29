//app components
import React, { Component } from "react";
import NavBar from "./NavBar";
import UserList from "./UserList";
import RoomLobbyLoadingScreen from "./RoomLobbyLoadingScreen";

//other components
import { Link } from "react-router-dom";

//css
import "../css/RoomLobby.css";

// Sockets and Redux
import * as SocketTypes from "../types/SocketState";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";
import { User } from "@suibian/commons";

// Types
type StateProps = {
  socketState: SocketTypes.SocketState;
  users: User[];
};

type Props = StateProps;

class RoomLobby extends Component<Props> {
  render() {
    return this.props.users.length > 0 ? (
      <>
        <NavBar />
        <div className="room-lobby">
          <div className="app-content flex-container flex-col flex-center-v flex-center-h flex-start">
            <h1 className="title">Room #{this.props.socketState.roomCode}</h1>
            <div className="user-list flex-container flex-col flex-center-v">
              <UserList users={this.props.users} />
            </div>
            <Link className="start-room" to="instructionpage">
              START
            </Link>
          </div>
        </div>
      </>
    ) : (
      <RoomLobbyLoadingScreen />
    );
  }
}

// Redux functions
const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    users: state.users,
    socketState: state.socketState
  };
};

export default connect(mapStateToProps)(RoomLobby);
