import React, { PureComponent } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import BACK_ICON from "../Assets/back.png";

class ModalCompany extends PureComponent {
  state = {
    name: "",
    contact_name: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    selectedValue: "New",
    error: false
  };
  handleSelectChange = value => {
    this.setState({ selectedValue: value.target.value });
  };
  handleInputText = (key, value) => {
    this.setState({ [key]: value.target.value });
  };
  inputsFilled = () => {
    return (
      this.state.name !== "" &&
      this.state.contact_name !== "" &&
      this.state.email !== "" &&
      this.state.phone !== "" &&
      this.state.address !== "" &&
      this.state.website !== ""
    );
  };
  render() {
    return (
      <div className="modal-card">
        <div className="modal-close" onClick={() => this.props.backToChoice()}>
          <img src={BACK_ICON} className="back-icon-modal" alt="back" />
        </div>
        <h4 className="modal-card-title">Add Lead:</h4>
        <p className="modal-error-msg">
          {this.state.error && "Invalid inputs"}
        </p>
        <div className="modal-card-inputs">
          <div className="modal-card-inputs-sub">
            <div className="input-container">
              <p className="input-label">Company name:</p>
              <input
                placeholder="Company name..."
                onChange={val => this.handleInputText("name", val)}
                value={this.state.name}
              />
            </div>
            <div className="input-container">
              <p className="input-label">Contact Name:</p>
              <input
                placeholder="Contact name..."
                onChange={val => this.handleInputText("contact_name", val)}
                value={this.state.contact_name}
              />
            </div>
          </div>
          <div className="modal-card-inputs-sub">
            <div className="input-container">
              <p className="input-label">Email:</p>
              <input
                placeholder="Contact email..."
                onChange={val => this.handleInputText("email", val)}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <p className="input-label">Phone:</p>
              <input
                placeholder="Contact phone..."
                onChange={val => this.handleInputText("phone", val)}
                value={this.state.phone}
              />
            </div>
          </div>
          <div className="modal-card-inputs-sub">
            <div className="input-container">
              <p className="input-label">Address:</p>
              <input
                placeholder="Company address..."
                onChange={val => this.handleInputText("address", val)}
                value={this.state.address}
              />
            </div>
            <div className="input-container">
              <p className="input-label">Website:</p>
              <input
                placeholder="Company website..."
                onChange={val => this.handleInputText("website", val)}
                value={this.state.website}
              />
            </div>
          </div>
          <div className="modal-card-inputs-sub">
            <label className="label-category">
              Category of the lead:
              <select
                className="select-category"
                value={this.state.selectedValue}
                onChange={this.handleSelectChange}
                style={{
                  backgroundColor:
                    this.state.selectedValue === "New"
                      ? "blue"
                      : this.state.selectedValue === "Won"
                      ? "green"
                      : "red"
                }}
              >
                <option value="New">New</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
            </label>
          </div>
        </div>
        <div className="card-btn-container">
          <ApolloConsumer>
            {client => (
              <div>
                <button
                  className={`card-btn ${this.inputsFilled() &&
                    "card-btn-active"}`}
                  onClick={async () => {
                    try {
                      const added_lead = await client.mutate({
                        mutation: ADD_LEAD,
                        variables: {
                          email: this.state.email,
                          name: this.state.name,
                          contact: this.state.contact_name,
                          address: this.state.address,
                          phone: this.state.phone,
                          web: this.state.website,
                          mentioned_by_company: this.props.my_company,
                          category: this.state.selectedValue
                        }
                      });
                      if (added_lead.data) {
                        this.props.backToChoice();
                        client.queryManager.refetchQueryByName("allLeads");
                      } else {
                        this.setState({ error: true });
                      }
                    } catch (e) {
                      this.setState({ error: true });
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            )}
          </ApolloConsumer>
        </div>
      </div>
    );
  }
}

export default ModalCompany;

const ADD_LEAD = gql`
  mutation createCompanyLead(
    $name: String!
    $contact: String!
    $email: String!
    $address: String!
    $phone: String!
    $web: String!
    $category: String!
    $mentioned_by_company: String!
  ) {
    createCompanyLead(
      name: $name
      contact: $contact
      email: $email
      address: $address
      mentioned_by_company: $mentioned_by_company
      web: $web
      phone: $phone
      category: $category
    ) {
      name
      contact
      phone
      email
      address
      web
      date
    }
  }
`;
