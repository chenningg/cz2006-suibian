//app components
import React, { Component, ChangeEvent } from "react";
import NavBar from "./NavBar";
import { Food, Vote, Votes, User } from "@suibian/commons";

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
  votes: Votes;
};

type DispatchProps = {
  updateVotes: (votes: Votes) => void;
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
    foods: [
      {
        foodname: "Bak Chor Mee",
        foodId: "123",
        imageurl:
          "https://www.linsfood.com/wp-content/uploads/2017/02/Bak-Chor-Mee.jpg"
      },
      {
        foodname: "Chicken Rice",
        foodId: "456",
        imageurl:
          "https://www.thespruceeats.com/thmb/ltMha1iXJIttnXv9EDQf9WFSrEE=/3896x2922/smart/filters:no_upscale()/hainanese-chicken-rice-very-detailed-recipe-3030408-hero-0a742f08c72044e999202a44e30a1ea7.jpg"
      },
      {
        foodname: "Burrito",
        foodId: "789",
        imageurl:
          "https://www.thespruceeats.com/thmb/Hn65vI6v55aIBCwMQaf0SWcVLYI=/2048x1360/filters:fill(auto,1)/vegetarian-bean-and-rice-burrito-recipe-3378550-9_preview-5b2417e1ff1b780037a58cda.jpeg"
      }
    ] as Food[],
    votes: {
      username: this.props.user.username,
      roomCode: this.props.socketState.roomCode,
      voteArray: [] as Vote[]
    } as Votes,
    redirect: false
  };

  //variables
  foodsList = this.state.foods.map(food => (
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
      foodId: this.state.foods[this.state.index].foodId
    };

    let updatedVotes = { ...this.state.votes };
    updatedVotes.voteArray.push(vote);

    this.setState({
      votes: updatedVotes,
      index: this.state.index + 1
    });

    if (this.state.index === this.state.foods.length - 1) {
      setTimeout(() => {
        this.handleCompletion();
      }, 1);
    }
  };

  handleCompletion = () => {
    this.props.updateVotes(this.state.votes);
    console.log(this.props.votes);

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
    votes: state.votes
  };
};

// Links a dispatch function to a prop
const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    updateVotes: votes => {
      dispatch({
        type: "UPDATE_VOTES",
        votes: votes
      });
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VotePage)
);
