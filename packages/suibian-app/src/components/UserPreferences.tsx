//app components
import React, { Component, FormEvent, ChangeEvent } from "react";
import NavBar from "./NavBar";

//other components
import ModalDialog from "./ModalDialog";

//css
import "../css/UserPreferences.css";

class UserPreferences extends Component {
  // State
  state = {
    halal: false,
    vegetarian: false,
    vegan: false,
    buddhist: false,
    showModal: false
  };

  // Variables
  preferences: Array<Preference> = [
    { type: "Halal", prefID: "0" },
    { type: "Vegetarian", prefID: "1" },
    { type: "Vegan", prefID: "2" },
    { type: "Buddhist", prefID: "3" }
  ];

  preferencesList = this.preferences.map(preference => (
    <div
      className="preference flex-container flex-row flex-spaced-between"
      key={preference.prefID}
    >
      <p className="preference-type">{preference.type}</p>
      <label className="switch-container">
        <input
          type="checkbox"
          id={preference.type.toLowerCase()}
          className="preference-type-input"
          value={preference.type.toLowerCase()}
          onChange={e => {
            this.onChange(e);
          }}
        />
        <span className="slider round"></span>
      </label>
    </div>
  ));

  // Methods
  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.id]: e.target.checked
    });
    this.setState({
      showModal: false
    });
  };

  onSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.setState({
      showModal: true
    });
  };

  render() {
    return (
      <>
        <NavBar />
        <div className="user-preferences">
          <ModalDialog
            message="User preferences saved!"
            modalType="confirmation"
            ttl={2}
            show={this.state.showModal}
          />
          <div className="app-content flex-container flex-col flex-center-v flex-center-h">
            <h1>User Preferences</h1>
            <form
              className="user-preferences-form flex-container flex-col flex-center-v flex-spaced-around"
              onSubmit={this.onSubmit}
            >
              {this.preferencesList}
              <button>Save preferences</button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default UserPreferences;
