import React, { Component, FormEvent, ChangeEvent } from "react";
import NavBar from "./NavBar";
import "../css/VotePage.css";
import socketIOClient from "socket.io-client";
import { socketCommands } from "@suibian/commons";
import { Favorite, Block, Timer as Clock } from "@material-ui/icons";
import Timer from "react-compound-timer";
import Vote from "../types/Vote";
import { Redirect } from "react-router-dom";
import Food from "../types/Food";

export type socketState = {
  endpoint: string;
  socket: suibianSocket | null;
  username: string;
  roomCode: number;
  index: number;
  votes: Vote[];
  redirect: boolean;
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
      roomCode: 0,
      index: 0,
      votes: [],
      redirect: false
    };
    this.handleVote = this.handleVote.bind(this);
  }

  foods = [
    {
      name: "Bak Chor Mee",
      imgurl:
        "https://www.linsfood.com/wp-content/uploads/2017/02/Bak-Chor-Mee.jpg"
    },
    {
      name: "Chicken Rice",
      imgurl:
        "https://www.thespruceeats.com/thmb/ltMha1iXJIttnXv9EDQf9WFSrEE=/3896x2922/smart/filters:no_upscale()/hainanese-chicken-rice-very-detailed-recipe-3030408-hero-0a742f08c72044e999202a44e30a1ea7.jpg"
    },
    {
      name: "Burrito",
      imgurl:
        "https://www.thespruceeats.com/thmb/Hn65vI6v55aIBCwMQaf0SWcVLYI=/2048x1360/filters:fill(auto,1)/vegetarian-bean-and-rice-burrito-recipe-3378550-9_preview-5b2417e1ff1b780037a58cda.jpeg"
    }
  ];

  foodsList = this.foods.map(food => (
    <div>
      <h1 className="title">{food.name}</h1>
      <img style={{ alignContent: "center" }} src={food.imgurl} />
    </div>
  ));

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

  handleVote = (e: ChangeEvent<EventTarget>, like: boolean) => {
    e.preventDefault();
    let vote: Vote = {
      like: like,
      name: this.foods[this.state.index].name
    };

    this.state.votes.push(vote);

    this.setState({ index: this.state.index + 1 });
    if (this.state.index == this.foods.length - 1) {
      this.setState({
        redirect: true
      });
    }
  };

  componentDidMount() {
    this.connectSocket().then(() => this.registerSocketListeners());
    setTimeout(() => {
      this.setState({
        redirect: true
      });
    }, 20000);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/waitpage"} />;
    }

    return (
      <>
        <div className="vote-page">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            {this.foodsList[this.state.index]}

            <br />
            <form className="create-room-form">
              <div className="vote-button-container">
                <div className="vote-button">
                  <p>
                    <Favorite
                      className="like"
                      style={styles.largeIcon}
                      onClick={e => this.handleVote(e, true)}
                    />
                  </p>
                </div>
                <div></div>
                <div className="vote-button">
                  <Block
                    className="dislike"
                    style={styles.largeIcon}
                    onClick={e => this.handleVote(e, false)}
                  />
                </div>
              </div>
            </form>
            <Clock style={styles.mediumIcon} />
            <Timer initialTime={20000} direction="backward">
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
