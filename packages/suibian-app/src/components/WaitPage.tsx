//app components
import React, { Component } from "react";

//other components
import { HourglassEmpty } from "@material-ui/icons";
import { Redirect } from "react-router-dom";

//css
import "../css/WaitPage.css";

const styles = {
  hugeIcon: {
    width: 200,
    height: 200
  }
};

class WaitPage extends Component {
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
