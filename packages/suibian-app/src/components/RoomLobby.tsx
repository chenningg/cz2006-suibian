//app components
import React, { Component } from "react";
import NavBar from "./NavBar";
import UserList from "./UserList";

//other components
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";

//css
import "../css/RoomLobby.css";

// Props
interface StateProps {
  roomID: string;
  users: User[];
}

type Props = StateProps;

class RoomLobby extends Component<Props> {
  render() {
    return (
      <>
        <NavBar />
        <div className="room-lobby">
          <div className="app-content flex-container flex-col flex-center-v flex-center-h flex-start">
            <h1 className="title">Room #{this.props.roomID}</h1>
            <div className="user-list flex-container flex-col flex-center-v">
              <UserList users={this.props.users} />
            </div>
            <Link className="start-room" to="instructionpage">
              START
            </Link>
          </div>
        </div>
      </>
    );
  }
}

// Redux functions
const mapStateToProps = (state: ReduxState) => {
  return {
    users: state.users,
    roomID: state.roomID
  };
};

export default connect(mapStateToProps)(RoomLobby);
