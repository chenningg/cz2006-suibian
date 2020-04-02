//app components
import React, { Component } from "react";
import Home from "./Home";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import UserPreferences from "./UserPreferences";
import RoomLobby from "./RoomLobby";
import InstructionPage from "./InstructionPage";
import VotePage from "./VotePage";
import WaitPage from "./WaitPage";
import ResultPage from "./ResultPage";
import EateryPage from "./EateryPage";

//other components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//css
import "../css/Global.css";

// Sockets and Redux
import { SocketState } from "../types/SocketState";
import { suibianSocketClient } from "@suibian/commons";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";
import { User } from "@suibian/commons";

// Types
type StateProps = {
  users: User[];
  socketState: SocketState;
};

type DispatchProps = {
  updateSocketState: (
    key: string,
    value: string | number | suibianSocketClient | null
  ) => void;
  updateUsers: (users: User[]) => void;
  updateUser: (key: string, value: boolean) => void;
};

type Props = StateProps & DispatchProps;

//component
class AppRouter extends Component<Props> {
  // Methods
  // When component mounts, connect to a socket then register socket listeners
  componentDidMount() {
    this.connectSocket().then(() => this.registerSocketListeners());
  }

  // When component unmounts, disconenct socket listeners
  componentWillUnmount() {
    this.deregisterSocketListeners();
  }

  // Connect to a socket
  connectSocket = async () => {
    if (this.props.socketState.socket) {
      console.log("Socket is already connected!");
      return;
    }

    // Initializing the connection
    const socket = (await socketIOClient()) as suibianSocketClient;
    console.log("Socket created!");
    this.props.updateSocketState("socket", socket);
  };

  // Register socket to listen to events
  registerSocketListeners = () => {
    console.log(this.props.socketState.socket);
    if (this.props.socketState.socket) {
      console.log("Registering socket listeners...");

      // On create room event fire, I log my data
      this.props.socketState.socket.on("createRoom", (data: any) => {
        if (data) {
          console.log(`Room #${data.roomCode} created.`);
          this.props.updateUser("isOwner", true);
          this.props.updateSocketState("roomCode", data.roomCode);
        } else {
          console.log(`Error! No data received from createRoom event.`);
        }
      });

      // On join room event fire, I log my data
      this.props.socketState.socket.on("joinRoom", (data: any) => {
        if (data) {
          console.log(`Joined room #${data.roomCode}.`);
          this.props.updateSocketState("roomCode", data.roomCode);
          this.props.updateUsers(data.users);
        } else {
          console.log(`Error! No data received from joinRoom event.`);
        }
      });
    }
  };

  // Deregister socket listeners on unmount
  deregisterSocketListeners = () => {
    console.log("Deregistering socket listeners...");
    this.props.updateSocketState("socket", null);
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/createroom" component={CreateRoom}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/joinroom" component={JoinRoom}></Route>
          <Route path="/userpreferences" component={UserPreferences}></Route>
          <Route path="/roomlobby" component={RoomLobby}></Route>
          <Route path="/instructionpage" component={InstructionPage}></Route>
          <Route path="/votepage" component={VotePage}></Route>
          <Route path="/result" component={ResultPage}></Route>
          <Route path="/eatery/:eatery_index" component={EateryPage}></Route>
          <Route path="/waitpage" component={WaitPage}></Route>
        </Switch>
      </Router>
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
    updateUsers: users => {
      dispatch({
        type: "UPDATE_USERS",
        users: users
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

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
