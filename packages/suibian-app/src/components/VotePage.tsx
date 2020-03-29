//app components
import React, { Component, ChangeEvent } from "react";
import NavBar from "./NavBar";
import { Food, Vote, User } from "@suibian/commons";

//other components
import { Favorite, Block, Timer as Clock } from "@material-ui/icons";
import Timer from "react-compound-timer";
import { Redirect, withRouter } from "react-router-dom";

//css
import "../css/VotePage.css";
import "../css/InstructionPage.css";

// Sockets and Redux
import { SocketState } from "../types/SocketState";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";

// Types
type OwnProps = {
  history: any;
  location: any;
  match: any;
};

type StateProps = {
  socketState: SocketState;
  user: User;
  votes: Vote[];
  foods: Food[];
};

type DispatchProps = {
  updateVotes: (votes: Vote[], username: string, roomCode: string) => void;
};

type Props = StateProps & DispatchProps & OwnProps;

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

class VotePage extends Component<Props> {
  //state
  state = {
    index: 0,
    votes: [] as Vote[],
    redirect: false
  };

  //variables
  foodsList = this.props.foods.map(food => (
    <div>
      <h1>{food.foodname}</h1>
      <img className="food-image" src={food.imageurl} alt={food.foodname} />
    </div>
  ));

  //methods
  handleVote = (e: ChangeEvent<EventTarget>, like: boolean) => {
    e.preventDefault();
    let vote: Vote = {
      like: like,
      foodId: this.props.foods[this.state.index].foodId
    };

    let updatedVotes = [...this.state.votes];
    updatedVotes.push(vote);

    this.setState({
      votes: updatedVotes,
      index: this.state.index + 1
    });

    if (this.state.index === this.props.foods.length - 1) {
      setTimeout(() => {
        this.handleCompletion();
      }, 1);
    }
  };

  handleCompletion = () => {
    this.props.updateVotes(
      this.state.votes,
      this.props.user.username,
      this.props.socketState.roomCode
    );
    console.log("props" + this.props.votes);
    console.log("state" + this.state.votes);

    // if (this.props.socketState.socket) {
    //   this.props.socketState.socket.emit("submitVote", {
    //     username: this.props.user.username,
    //     roomCode: this.props.socketState.roomCode,
    //     votes: this.props.votes
    //   });
    // }

    this.setState({
      redirect: true
    });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/waitpage"} />;
    }

    return (
      <>
        <NavBar />
        <div className="vote-page">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <div>{this.foodsList[this.state.index]}</div>
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
              <div className="vote-button">
                <Clock style={styles.mediumIcon} />
                <Timer
                  initialTime={20500}
                  direction="backward"
                  checkpoints={[
                    { time: 0, callback: () => this.handleCompletion() }
                  ]}
                >
                  {() => (
                    <h1>
                      <Timer.Seconds />
                    </h1>
                  )}
                </Timer>
              </div>
              <div className="vote-button">
                <p>
                  <Block
                    className="dislike"
                    style={styles.largeIcon}
                    onClick={e => this.handleVote(e, false)}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// Redux functions
const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    socketState: state.socketState,
    user: state.user,
    votes: state.votes,
    foods: state.foods
  };
};

// Links a dispatch function to a prop
const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    updateVotes: (votes, username, roomCode) => {
      dispatch({
        type: "SUBMIT_VOTES",
        votes: votes,
        username: username,
        roomCode: roomCode
      });
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VotePage)
);
