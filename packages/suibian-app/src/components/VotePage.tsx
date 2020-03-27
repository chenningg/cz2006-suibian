import React, { Component, FormEvent, ChangeEvent } from "react";
import NavBar from "./NavBar";
import "../css/VotePage.css";
import socketIOClient from "socket.io-client";
import { socketCommands } from "@suibian/commons";
import { Favorite, Close, Timer as Clock } from "@material-ui/icons";
import Timer from "react-compound-timer";
import { red } from "@material-ui/core/colors";

export type socketState = {
  endpoint: string;
  socket: suibianSocket | null;
  username: string;
  roomCode: number;
};

interface suibianSocket extends SocketIOClient.Socket {
  emit(event: socketCommands, data: any): SocketIOClient.Socket;
}

const styles = {
  largeIcon: {
    width: 100,
    height: 100
  },
  mediumIcon: {
    width: 50,
    height: 50
  }
};

class VotePage extends Component<{}, socketState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      endpoint: "http://localhost:4000/",
      socket: null,
      username: "",
      roomCode: 0
    };
  }

  // onChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   // @ts-ignore */
  //   this.setState({ [e.target.id]: e.target.value });
  // };

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
      this.state.socket.on("votePage", (data: any) => {
        console.log(data);
      });
    }
  };

  // changeUsername = () => {
  //   if (this.state.socket) {
  //     this.state.socket.emit("changeUsername", {
  //       userName: this.state.username,
  //       message: this.state.username
  //     });
  //   }
  // };

  // createRoom = (e: FormEvent) => {
  //   e.preventDefault();
  //   if (this.state.socket) {
  //     this.changeUsername();
  //     this.state.socket.emit("createRoom", {
  //       username: this.state.username,
  //       roomCode: this.state.roomCode
  //     });
  //   }
  // };

  componentDidMount() {
    this.connectSocket().then(() => this.registerSocketListeners());
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="instruction-page">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h1 className="title">Food Name</h1>
            <img src="pic_trulli.jpg" alt="Italian Trulli"></img>
            <br />
            <form
              className="create-room-form"
              // onSubmit={e => this.createRoom(e)}
            >
              <div className="vote-button-container">
                <div className="vote-button">
                  <p>
                    <Favorite className="like" style={styles.largeIcon} />
                  </p>
                  <p>Sedaaaap!</p>
                  <p>
                    Everyone needs to try this <b>NOW</b>
                  </p>
                </div>
                <div></div>
                <div className="vote-button">
                  <p>
                    <Close className="dislike" style={styles.largeIcon} />
                  </p>
                  <p>Ewww no!</p>
                  <p>
                    No one should <b>EVER</b> eat this
                  </p>
                </div>
              </div>
            </form>
            <br />
            <br />
            <Clock style={styles.mediumIcon} />
            <Timer initialTime={10000} direction="backward">
              {() => (
                <h1>
                  <Timer.Seconds />
                </h1>
              )}
            </Timer>
          </div>
        </div>
      </>
    );
  }
}

export default VotePage;
