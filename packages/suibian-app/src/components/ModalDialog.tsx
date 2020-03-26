import React, { Component } from "react";
import "../css/ModalDialog.css";

/* To use this, import ModalDialog from "./ModalDialog"
/* Add a "show" attribute to your state. On event, setState(show: true).
/* Insert < ModalDialog message="YOUR MSG" ttl={time to live in seconds} show={this.state.show} /> in a render() function.
/* When this.state.show becomes true, you will see your modal.
/* To reset, you need to setState(show) back to false in another event or refresh the page. */

type DialogProp = {
  message: string;
  show: boolean;
  ttl?: number;
  onClose?: CloseEvent; // You can pass back an onClose event when using buttons for example to close the dialog
  modalType?: string; // Type of modal (warning/confirmation/default)
};

class ModalDialog extends Component<DialogProp> {
  // We can access DialogProp above with this.props
  render() {
    let modalClasses =
      "modal-dialog flex-container flex-center-v flex-center-h ttl-" +
      (this.props.ttl?.toString() || "2") +
      " modal-" +
      (this.props.modalType || "default");

    return this.props.show ? (
      <div className={modalClasses}>
        <p>{this.props.message}</p>
      </div>
    ) : null;
  }
}

export default ModalDialog;
