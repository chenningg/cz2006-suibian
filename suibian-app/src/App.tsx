import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  connectBackEnd = async () => {
    fetch("/api/test")
      .then(res => res.json())
      .then(message => this.setState({ message }));
  };

  state = { message: "" };

  render() {
    return (
      <div className="App">
        <button className="more" onClick={this.connectBackEnd}>
          Get More
        </button>
        <p>message is {this.state.message}</p>
      </div>
    );
  }
}

export default App;
