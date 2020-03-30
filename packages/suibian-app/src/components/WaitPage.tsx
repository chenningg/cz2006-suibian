//app components
import React, { Component } from "react";

//other components
import { HourglassEmpty } from "@material-ui/icons";
import { Redirect, withRouter } from "react-router-dom";
import { Result } from "@suibian/commons";
import axios from "axios";

//css
import "../css/WaitPage.css";
import Loader from "react-loader-spinner";

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
  result: Result;
};

type DispatchProps = {
  updateResult: (result: Result) => void;
};

type Props = StateProps & DispatchProps & OwnProps;

const styles = {
  hugeIcon: {
    width: 200,
    height: 200
  }
};

class WaitPage extends Component<Props> {
  //state
  state = {
    redirect: false
  };

  // Register socket to listen to events
  registerSocketListeners = () => {
    console.log(this.props.socketState.socket);
    if (this.props.socketState.socket) {
      console.log("Registering socket listeners...");

      // On start room event fire, I log my data
      this.props.socketState.socket.on("updateResult", (data: any) => {
        if (data) {
          console.log(data);
          this.cleanResult(data);
          this.setState({ redirect: true });
        } else {
          console.log(`Error! No data received from submitVote event.`);
        }
      });
    }
  };

  // Update state with actual result
  cleanResult = async (data: any) => {
    const newEateries: any = [];

    for (let i = 0; i < data.eatery.length; i++) {
      const eatery = data.eatery[i];
      const postalCode = data.eatery[i].location;
      let locationObj = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&region=sg&key=AIzaSyDEaux00JCnvfiaqExfJHY5cu-oe8fSOxA`
      );

      let loc = await locationObj.data.results[0].geometry.location;
      let newEatery = {
        name: eatery.name,
        location: { latitude: loc.lat, longitude: loc.lng },
        stalls: eatery.stalls
      };

      newEateries.push(newEatery);
    }

    console.log({ ...data, eatery: newEateries });

    this.props.updateResult({ ...data, eatery: newEateries });
  };

  componentDidMount() {
    this.registerSocketListeners();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/result"} />;
    }

    return (
      <>
        <div className="wait-page">
          <div className="app-content flex-container flex-col flex-center-h flex-center-v">
            <h1>TIME'S UP</h1>
            <HourglassEmpty style={styles.hugeIcon} />
            <h3>Tabulating results...</h3>
            <div className="loader">
              <Loader type="ThreeDots" color="#000000" />
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
    result: state.result
  };
};

// Links a dispatch function to a prop
const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    updateResult: result => {
      dispatch({
        type: "UPDATE_RESULT",
        result: result
      });
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WaitPage)
);
