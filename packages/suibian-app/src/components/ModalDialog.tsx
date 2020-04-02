//app components
import React, { Component, AnimationEvent } from "react";
import { connect } from "react-redux";
import ReduxState from "../types/ReduxState";

//css
import "../css/ModalDialog.css";

/* To use this, import ModalDialog from "./ModalDialog"
/* Add a "show" attribute to your state. On event, setState(show: true).
/* Insert < ModalDialog message="YOUR MSG" ttl={time to live in seconds} show={this.state.show} /> in a render() function.
/* When this.state.show becomes true, you will see your modal.
/* To reset, you need to setState(show) back to false in another event or refresh the page. */

type StateProps = {
  modal: Modal;
};

type DispatchProps = {
  hideModal: () => void;
};

type Props = StateProps & DispatchProps;

class ModalDialog extends Component<Props> {
  handleAnimationEnd = (e: AnimationEvent<HTMLDivElement>) => {
    this.props.hideModal();
  };

  render() {
    let modalClasses =
      "modal-dialog flex-container flex-center-v flex-center-h ttl-" +
      (this.props.modal.ttl?.toString() || "2") +
      " modal-" +
      (this.props.modal.modalType || "default");

    return this.props.modal.show ? (
      <div className={modalClasses} onAnimationEnd={this.handleAnimationEnd}>
        <p>{this.props.modal.message}</p>
      </div>
    ) : null;
  }
}

// Redux functions
const mapStateToProps = (state: ReduxState): StateProps => {
  return {
    modal: state.modal
  };
};

// Links a dispatch function to a prop
const mapDispatchToProps = (dispatch: any): DispatchProps => {
  return {
    hideModal: () => {
      dispatch({
        type: "HIDE_MODAL"
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalDialog);
