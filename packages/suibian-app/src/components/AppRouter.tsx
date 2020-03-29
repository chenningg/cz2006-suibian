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
import Recommendations from "./Recommendations";
import Eatery from "./Eatery";

//other components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//css
import "../css/Global.css";

// Sockets and Redux
import * as SocketTypes from "../types/SocketState";
import socketIOClient from "socket.io-client";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";
import { User } from "@suibian/commons";

// Types
type StateProps = {
  users: User[];
  socketState: SocketTypes.SocketState;
};

type DispatchProps = {
  updateSocketState: (
    key: string,
    value: string | number | SocketTypes.SuibianSocket | null
  ) => void;
  updateUsers: (users: User[]) => void;
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
    const socket = await socketIOClient(this.props.socketState.endpoint);
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
        console.log(`Room #${data} created.`);
      });

      // On join room event fire, I log my data
      this.props.socketState.socket.on("joinRoom", (data: any) => {
        this.props.updateUsers(data);
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
          <Route path="/recommendations" component={Recommendations}></Route>
          <Route path="/eatery" component={Eatery}></Route>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
