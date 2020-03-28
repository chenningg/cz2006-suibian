//app components
import React, { Component, FormEvent, ChangeEvent } from "react";
import NavBar from "./NavBar";

//socket
import socketIOClient from "socket.io-client";
import { socketCommands } from "@suibian/commons";

//other components
import { Favorite, Block, Timer as Clock } from "@material-ui/icons";
import Timer from "react-compound-timer";
import { Redirect } from "react-router-dom";

//css
import "../css/InstructionPage.css";

export type socketState = {
  endpoint: string;
  socket: suibianSocket | null;
  username: string;
  roomCode: number;
  redirect: boolean;
};

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

interface suibianSocket extends SocketIOClient.Socket {
  emit(event: socketCommands, data: any): SocketIOClient.Socket;
}

class InstructionPage extends Component<{}, socketState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      endpoint: "http://localhost:4000/",
      socket: null,
      username: "",
      roomCode: 0,
      redirect: false
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
      this.state.socket.on("instructionPage", (data: any) => {
        console.log(data);
      });
    }
  };

  componentDidMount() {
    this.connectSocket().then(() => this.registerSocketListeners());
    setTimeout(() => {
      this.setState({
        redirect: true
      });
    }, 10000);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/votepage"} />;
    }

    return (
      <>
        <div className="instruction-page">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h1 className="title">Before we begin...</h1>
            <form className="create-room-form">
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
                    <Block className="dislike" style={styles.largeIcon} />
                  </p>
                  <p>Ewww no!</p>
                  <p>
                    No one should <b>EVER</b> eat this
                  </p>
                </div>
              </div>
            </form>
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

export default InstructionPage;
