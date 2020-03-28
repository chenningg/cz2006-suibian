//app components
import React, { Component } from "react";

//other compoents
import { Link } from "react-router-dom";

//css
import suibian_home_logo from "../images/suibian_full_logo.png";
import "../css/Home.css";

class Home extends Component {
  // State
  state = {
    description: "good food"
  };

  // Variables
  foodDescription = [
    "laska",
    "char kway teow",
    "carrot cake",
    "bee hoon",
    "satay",
    "fried rice",
    "hokkien mee",
    "mee siam",
    "ayam penyet",
    "mee goreng",
    "chicken rice",
    "mala",
    "wanton mee",
    "bak chor mee",
    "chicken chop",
    "carbonara",
    "aglio olio",
    "bolognese",
    "pork chop",
    "mixed rice",
    "yong tau fu",
    "zi char",
    "roti prata",
    "naan",
    "tandoori chicken",
    "curry rice",
    "teriyaki salmon",
    "omelette rice",
    "ramen",
    "udon",
    "bibimbap",
    "bulgogi rice",
    "ramyeon",
    "sushi",
    "japchae",
    "kimbap",
    "butter chicken",
    "nasi lemak",
    "porridge",
    "ice kachang",
    "fried chicken",
    "tikka masala",
    "mee rubus",
    "nasi padang",
    "hotpot",
    "dumpling noodle",
    "chow mein",
    "prawn noodle"
  ];

  timerRef;

  generateRandomIndex = () => {
    return Math.ceil(Math.random() * this.foodDescription.length) - 1;
  };

  updateDescription = () => {
    let index = this.generateRandomIndex();

    // Regenerate if same food
    let count = 0;
    while (this.foodDescription[index] === this.state.description) {
      if (count > 2) {
        break;
      }
      index = this.generateRandomIndex();
      count += 1;
    }

    count = 0;

    this.setState({
      description: this.foodDescription[index]
    });
  };

  render() {
    clearInterval(this.timerRef);
    this.timerRef = setInterval(this.updateDescription, 3000);

    return (
      <>
        <div className="home">
          <div className="app-content flex-container flex-col flex-height-100 flex-center-v flex-center-h text-center">
            <figure>
              <img
                className="suibian-logo"
                src={suibian_home_logo}
                alt="Suibian's logo."
              ></img>
            </figure>
            <div className="description">
              <p>I wanna eat {this.state.description}</p>
            </div>
            <div className="main-menu flex-container flex-col flex-spaced-between flex-center-h">
              <Link
                to="/createroom"
                className="main-menu-button remove-text-decoration center"
              >
                CREATE ROOM
              </Link>
              <Link
                to="/joinroom"
                className="main-menu-button remove-text-decoration center"
              >
                JOIN ROOM
              </Link>
            </div>
            <Link
              to="/userpreferences"
              className="user-prefs remove-text-decoration center"
            >
              User preferences
            </Link>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
