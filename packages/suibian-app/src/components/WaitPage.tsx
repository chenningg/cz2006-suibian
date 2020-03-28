//app components
import React, { Component } from "react";

//socket
import socketIOClient from "socket.io-client";
import { socketCommands } from "@suibian/commons";

//other components
import { HourglassEmpty } from "@material-ui/icons";
import { Redirect } from "react-router-dom";

//css
import "../css/WaitPage.css";

export type socketState = {
  endpoint: string;
  socket: suibianSocket | null;
  username: string;
  roomCode: number;
  redirect: boolean;
};

const styles = {
  hugeIcon: {
    width: 200,
    height: 200
  }
};

interface suibianSocket extends SocketIOClient.Socket {
  emit(event: socketCommands, data: any): SocketIOClient.Socket;
}

class WaitPage extends Component<{}, socketState> {
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
      this.state.socket.on("waitPage", (data: any) => {
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
    }, 5000);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/recommendations"} />;
    }

    return (
      <>
        <div className="wait-page">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h1>TIME'S UP</h1>
            <HourglassEmpty style={styles.hugeIcon} />
            <h3>Tabulating results...</h3>
          </div>
        </div>
      </>
    );
  }
}

export default WaitPage;
