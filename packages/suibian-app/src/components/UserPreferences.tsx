//app components
import React, { Component, FormEvent, ChangeEvent } from "react";
import NavBar from "./NavBar";

//other components
import ModalDialog from "./ModalDialog";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";
import { Preference } from "@suibian/commons";

//css
import "../css/UserPreferences.css";

type StateProps = {
  userPreferences: Preference[];
};

type DispatchProps = {
  updatePreferences: (preferenceType: string) => void;
  showModal: (message: string, ttl?: number, modalType?: string) => void;
};

type Props = StateProps & DispatchProps;

class UserPreferences extends Component<Props> {
  // Methods
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.updatePreferences(e.target.id);
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.showModal("User preferences saved!", 2, "confirmation");
  };

  preferencesList = this.props.userPreferences.map(preference => (
    <div
      className="preference flex-container flex-row flex-spaced-between"
      key={preference.prefID}
    >
      <p className="preference-type">{preference.type}</p>
      <label className="switch-container">
        <input
          type="checkbox"
          id={preference.type}
          className="preference-type-input"
          onChange={e => {
            this.handleChange(e);
          }}
          defaultChecked={preference.value}
        />
        <span className="slider round"></span>
      </label>
    </div>
  ));

  render() {
    return (
      <>
        <NavBar />
        <div className="user-preferences">
          <ModalDialog />
          <div className="app-content flex-container flex-col flex-center-v flex-center-h">
            <h1>User Preferences</h1>
            <form
              className="user-preferences-form flex-container flex-col flex-center-v flex-spaced-around"
              onSubmit={this.handleSubmit}
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

// Redux functions
const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    userPreferences: state.user.preferences
  };
};

// Links a dispatch function to a prop
const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    updatePreferences: (preferenceType: string) => {
      dispatch({
        type: "UPDATE_USER_PREFERENCES",
        preferenceType: preferenceType
      });
    },
    showModal: (message, ttl?, modalType?) => {
      dispatch({
        type: "SHOW_MODAL",
        modal: { message, ttl, modalType }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPreferences);
