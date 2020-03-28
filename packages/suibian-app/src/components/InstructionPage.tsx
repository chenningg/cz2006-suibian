//app components
import React, { Component } from "react";
import NavBar from "./NavBar";

//other components
import { Favorite, Block, Timer as Clock } from "@material-ui/icons";
import Timer from "react-compound-timer";
import { Redirect } from "react-router-dom";

//css
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

class InstructionPage extends Component {
  //state
  state = {
    redirect: false
  };

  //methods
  componentDidMount() {
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
        <NavBar />
        <div className="instruction-page">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h1>Before we begin...</h1>

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

            <br />
            <Clock style={styles.mediumIcon} />
            <Timer initialTime={7500} direction="backward">
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
