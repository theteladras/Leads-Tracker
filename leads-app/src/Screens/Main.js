import React, { Component } from "react";
import Partners from "../Components/Partners";
import List from "../Components/List";
import Overview from "./Overview";
import Modal from "../Components/Modal";
import DATE_ICON from "../Assets/date.png";
import ALPHA_ICON from "../Assets/alphabetically.png";
import "../App.css";

class App extends Component {
  state = {
    show_modal: false,
    sort: "date",
    selected_company: "",
    show_overview: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.selected_company !== "" &&
      this.state.selected_company !== nextState.selected_company
    ) {
      this.setState({ show_overview: true });
    }
    return true;
  }

  handleAdd = () => {
    this.setState({ show_modal: !this.state.show_modal });
  };

  renderOptionsBar = () => {
    if (this.props.content.personal_data) {
      return (
        <div className="add-lead">
          <img
            src={ALPHA_ICON}
            className={`sort-icon ${!(this.state.sort === "alpha") &&
              "small-opacity"}`}
            alt="alphabet"
            onClick={() => this.setState({ sort: "alpha" })}
          />
          <img
            src={DATE_ICON}
            className={`sort-icon ${!(this.state.sort === "date") &&
              "small-opacity"}`}
            alt="date"
            onClick={() => this.setState({ sort: "date" })}
          />
          <p className="add-lead-text" onClick={this.handleAdd}>
            +
          </p>
        </div>
      );
    }
    return (
      <div className="add-lead">
        <p className="empty-space-ocupier" />
      </div>
    );
  };

  renderModal = () => {
    if (!this.state.show_modal) {
      return;
    }
    return (
      <Modal
        handleAdd={this.handleAdd}
        my_company={this.props.content.personal_data.company}
      />
    );
  };

  logout = () => {
    localStorage.setItem("login_data", null);
    this.props.changeScreen(0);
  };

  selectedCompany = val => {
    this.setState({ selected_company: val });
  };

  render() {
    if (this.state.show_overview) {
      return (
        <div className="App">
          <Overview
            personal_email={this.props.content.personal_data.email}
            selected_company={this.state.selected_company}
            goBack={() =>
              this.setState({ show_overview: false, selected_company: "" })
            }
          />
        </div>
      );
    }
    return (
      <div className="App">
        {this.renderModal()}
        <div className="page-title-container">
          <h2 className="page-title">Leads Tracker</h2>
          <div className="personal_info_container">
            <div className="username-container">
              <p className="username">Username</p>
              <p className="my-username">
                : {this.props.content.personal_data.username}
              </p>
            </div>
            <div className="company-container">
              <p className="company">Company</p>
              <p className="my-company">
                : {this.props.content.personal_data.company}
              </p>
            </div>
          </div>
          <h6 className="logout-text" onClick={this.logout}>
            <b className="arrow"> ►</b> Logout
          </h6>
        </div>
        <div className="row">
          <div className="list-item-container">
            {this.renderOptionsBar()}
            <List
              {...this.props}
              sort={this.state.sort}
              main={true}
              handleAdd={this.handleAdd}
            />
          </div>
          <div className="company-panel">
            <p className="company-panel-report">Partners:</p>
            <Partners {...this.props} selectedCompany={this.selectedCompany} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// npm i prettier eslint-config-prettier eslint-plugin-prettier
