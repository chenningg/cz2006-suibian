//app components
import React, { Component, FormEvent, ChangeEvent } from "react";
import NavBar from "./NavBar";

//other components
import ModalDialog from "./ModalDialog";
import { connect } from "react-redux";

//css
import "../css/UserPreferences.css";

type StateProps = {
  userPreferences: Preference[];
};

type DispatchProps = {
  updatePreferences: (preferenceType: string) => void;
};

type State = {
  showModal: boolean;
};

type Props = StateProps & DispatchProps;

class UserPreferences extends Component<Props> {
  // State
  state: State = {
    showModal: false
  };

  // Methods
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.updatePreferences(e.target.id);
    this.setState({
      showModal: false
    });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.setState({
      showModal: true
    });
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
    userPreferences: state.userPreferences
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPreferences);
