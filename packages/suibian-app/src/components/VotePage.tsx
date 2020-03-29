//app components
import React, { Component, ChangeEvent } from "react";
import NavBar from "./NavBar";

//other components
import { Favorite, Block, Timer as Clock } from "@material-ui/icons";
import Timer from "react-compound-timer";
import { Redirect } from "react-router-dom";
import { Vote } from "@suibian/commons";

//css
import "../css/VotePage.css";
import "../css/InstructionPage.css";

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

class VotePage extends Component {
  //state
  state = {
    index: 0,
    foods: [
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
    ] as Food[],
    votes: [] as Vote[],
    redirect: false
  };

  //variables
  foodsList = this.state.foods.map(food => (
    <div>
      <h1>{food.name}</h1>
      <img className="food-image" src={food.imgurl} alt={food.name} />
    </div>
  ));

  //methods
  handleVote = (e: ChangeEvent<EventTarget>, like: boolean) => {
    e.preventDefault();
    let vote: Vote = {
      like: like,
      name: this.state.foods[this.state.index].name
    };

    this.setState({
      votes: this.state.votes.concat([vote])
    });

    this.setState({
      index: this.state.index + 1
    });

    if (this.state.index === this.state.foods.length - 1) {
      this.setState({
        redirect: true
      });
    }
  };

  componentDidMount() {
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
                <Timer initialTime={20500} direction="backward">
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

export default VotePage;
