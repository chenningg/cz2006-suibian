//app components
import React, { Component } from "react";
import NavBar from "./NavBar";
import UserList from "./UserList";
import RoomLobbyLoadingScreen from "./RoomLobbyLoadingScreen";

//other components
import { Redirect } from "react-router-dom";

//css
import "../css/RoomLobby.css";

// Sockets and Redux
import { SocketState } from "../types/SocketState";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";
import {
  User,
  Food,
  foodArrayPayload,
  joinRoomPayload,
} from "@suibian/commons";

// Types
type OwnProps = {
  history: any;
  location: any;
  match: any;
};

type StateProps = {
  socketState: SocketState;
  foods: any;
  users: User[];
  user: User;
};

type DispatchProps = {
  updateFoods: (foods: Food[]) => void;
  updateUser: (key: string, value: boolean) => void;
};

type Props = StateProps & DispatchProps & OwnProps;

class RoomLobby extends Component<Props> {
  //state
  state = {
    redirect: false,
  };

  // disabled: string = this.props.user.isOwner ? "TRUE" : "FALSE";

  // Register socket to listen to events
  registerSocketListeners = () => {
    console.log(this.props.socketState.socket);
    if (this.props.socketState.socket) {
      console.log("Registering socket listeners...");

      // On start room event fire, I log my data
      this.props.socketState.socket.on(
        "startRoom",
        (data: foodArrayPayload) => {
          console.log({ data });
          if (data) {
            const { foodArray } = data;
            this.props.updateFoods(foodArray);
            this.setState({ redirect: true });
          } else {
            console.log(`Error! No data received from startRoom event.`);
          }
        }
      );
    }
  };

  // Methods
  componentDidMount() {
    this.registerSocketListeners();
  }

  // Call leave room method
  leaveRoom() {
    const leaveRoomPayload: joinRoomPayload = {
      roomCode: this.props.socketState.roomCode,
      user: this.props.user,
    };
    if (this.props.socketState.socket) {
      this.props.socketState.socket.emit("leaveRoom", leaveRoomPayload);
      this.props.updateUser("isOwner", false);
      console.log("leaving room component unmounted");
    }
  }

  // Emit start room event to socket (Room owner starts room)
  handleStart = () => {
    console.log(this.props);
    if (this.props.socketState.socket) {
      this.props.socketState.socket.emit("startRoom", {
        roomCode: this.props.socketState.roomCode,
      });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/instructionpage"} />;
    }

    return this.props.users.length > 0 ? (
      <>
        <NavBar leaveRoom={this.leaveRoom} />
        <div className="room-lobby">
          <div className="app-content flex-container flex-col flex-center-v flex-center-h flex-start">
            <h1 className="title">Room #{this.props.socketState.roomCode}</h1>
            <div className="user-list flex-container flex-col flex-center-v">
              <UserList users={this.props.users} />
            </div>
            <br />
            <button
              onClick={this.handleStart}
              disabled={!this.props.user.isOwner}
              className={this.props.user.isOwner ? "" : "disabled"}
            >
              START
            </button>
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
    socketState: state.socketState,
    foods: state.foods,
    user: state.user,
  };
};

// Links a dispatch function to a prop
const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    updateFoods: (foods) => {
      dispatch({
        type: "UPDATE_FOODS",
        foods: foods,
      });
    },
    updateUser: (key, value) => {
      dispatch({
        type: "UPDATE_USER",
        key: key,
        value: value,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomLobby);
