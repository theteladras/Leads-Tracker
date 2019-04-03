import React, { PureComponent } from "react";
import ModalUser from "./ModalUser";
import ModalCompany from "./ModalCompany";
import CLOSE_ICON from "../Assets/close.png";

class Modal extends PureComponent {
  state = {
    show_modal_users: false,
    show_modal_company: false
  };
  renderBody = () => {
    if (!this.state.show_modal_users && !this.state.show_modal_company) {
      return (
        <div className="modal-btn-container">
          <div
            className="modal-icon-holder"
            onClick={() => this.props.handleAdd()}
          >
            <img
              src={CLOSE_ICON}
              className="close-icon-modal"
              alt="close button"
            />
          </div>
          <button
            className="modal-btn user-btn"
            onClick={() => this.setState({ show_modal_users: true })}
          >
            Add User Lead
          </button>
          <button
            className="modal-btn company-btn"
            onClick={() => this.setState({ show_modal_company: true })}
          >
            Add Company Lead
          </button>
        </div>
      );
    } else if (this.state.show_modal_users) {
      return (
        <ModalUser
          {...this.props}
          backToChoice={() => this.setState({ show_modal_users: false })}
          my_company={this.props.my_company}
        />
      );
    } else if (this.state.show_modal_company) {
      return (
        <ModalCompany
          {...this.props}
          backToChoice={() => this.setState({ show_modal_company: false })}
          my_company={this.props.my_company}
        />
      );
    }
  };
  render() {
    return (
      <div className="modal-container">
        <div
          className="modal-container"
          onClick={() => this.props.handleAdd()}
        />
        <div
          className={`modal-card ${
            !this.state.show_modal_company && !this.state.show_modal_users
              ? "card_small"
              : null
          }`}
        >
          {this.renderBody()}
        </div>
      </div>
    );
  }
}

export default Modal;
