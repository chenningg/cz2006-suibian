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
type OwnProps = {
  loaded: boolean;
};

type StateProps = {
  socketState: SocketTypes.SocketState;
  users: User[];
  user: User;
};

type Props = StateProps & OwnProps;

class RoomLobby extends Component<Props> {
  render() {
    const backLink = this.props.user.isOwner ? "/createroom" : "/joinroom";
    return this.props.users.length > 0 ? (
      <>
        <NavBar backPage={backLink} />
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
    user: state.user,
    users: state.users,
    socketState: state.socketState
  };
};

export default connect(mapStateToProps)(RoomLobby);
