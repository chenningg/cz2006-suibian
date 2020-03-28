//app components
import React, { Component } from "react";
import Home from "./Home";
import CreateRoom from "./CreateRoom";
import JoinRoom from "./JoinRoom";
import UserPreferences from "./UserPreferences";
import SelectLocation from "./SelectLocation";
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

//creating socket
import socketIOClient from "socket.io-client";
import { socketCommands } from "@suibian/commons";

export type socketState = {
  endpoint: string;
  socket: suibianSocket | null;
  username: string;
  roomCode: number;
};

interface suibianSocket extends SocketIOClient.Socket {
  emit(event: socketCommands, data: any): SocketIOClient.Socket;
}

//component
class AppRouter extends Component<{}, socketState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      endpoint: "http://localhost:4000/",
      socket: null,
      username: "",
      roomCode: 0
    };
  }

  connectSocket = async () => {
    if (this.state.socket) {
      console.log("socket is already conencted");
      return;
    }

    // initializing the connection
    const { endpoint } = this.state;
    const socket = await socketIOClient(endpoint);
    console.log("socket created");
    this.setState({ socket });
  };

  registerSocketListeners = () => {
    console.log(this.state.socket);
    if (this.state.socket) {
      console.log("registering socket listeners");
      this.state.socket.on("createRoom", (data: any) => {
        console.log(data);
      });
    }
  };

  componentDidMount() {
    this.connectSocket().then(() => this.registerSocketListeners());
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/createroom" component={CreateRoom}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/joinroom" component={JoinRoom}></Route>
          <Route path="/userpreferences" component={UserPreferences}></Route>
          <Route path="/selectlocation" component={SelectLocation}></Route>
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

export default AppRouter;
