//app components
import React, { Component } from "react";
import NavBar from "./NavBar";
import { UserList } from "./UserList";

//other components
import { Link } from "react-router-dom";

//css
import "../css/RoomLobby.css";

class RoomLobby extends Component {
  // State
  state = {
    roomID: "1997",
    enoughUsers: false,
    canStart: false,
    users: [
      { id: "0", username: "Robin", isOwner: true },
      { id: "1", username: "Amy", isOwner: false },
      { id: "2", username: "Hathaway", isOwner: false },
      { id: "3", username: "Benny", isOwner: false },
      { id: "4", username: "Jake", isOwner: false },
      { id: "5", username: "Hailey", isOwner: false },
      { id: "6", username: "Mary", isOwner: false },
      { id: "7", username: "Luther", isOwner: false },
      { id: "8", username: "Alexander", isOwner: false },
      { id: "9", username: "Raina", isOwner: false },
      { id: "10", username: "Hane", isOwner: false }
    ]
  };

  render() {
    return (
      <>
        <NavBar backPage="createroom" />
        <div className="room-lobby">
          <div className="app-content flex-container flex-col flex-center-v flex-center-h flex-start">
            <h1 className="title">Room #{this.state.roomID}</h1>
            <div className="user-list flex-container flex-col flex-center-v">
              <UserList users={this.state.users} />
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

export default RoomLobby;
