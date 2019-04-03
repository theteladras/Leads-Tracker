import React, { PureComponent } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import BACK_ICON from "../Assets/back.png";

class ModalUser extends PureComponent {
  state = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    address: "",
    gender: "M",
    selectedValue: "New",
    error: false
  };
  handleSelectChange = value => {
    this.setState({ selectedValue: value.target.value });
  };
  handleGenderSelectChange = value => {
    this.setState({ gender: value.target.value });
  };
  handleInputText = (key, value) => {
    this.setState({ [key]: value.target.value });
  };
  inputsFilled = () => {
    return (
      this.state.name !== "" &&
      this.state.surname !== "" &&
      this.state.email !== "" &&
      this.state.phone !== "" &&
      this.state.address !== ""
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
              <p className="input-label">Name:</p>
              <input
                placeholder="Name..."
                onChange={val => this.handleInputText("name", val)}
                value={this.state.name}
              />
            </div>
            <div className="input-container">
              <p className="input-label">Surname:</p>
              <input
                placeholder="Surname..."
                onChange={val => this.handleInputText("surname", val)}
                value={this.state.surname}
              />
            </div>
          </div>
          <div className="modal-card-inputs-sub">
            <div className="input-container">
              <p className="input-label">Email:</p>
              <input
                placeholder="Email..."
                onChange={val => this.handleInputText("email", val)}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <p className="input-label">Phone:</p>
              <input
                placeholder="Phone number..."
                onChange={val => this.handleInputText("phone", val)}
                value={this.state.phone}
              />
            </div>
          </div>
          <div className="modal-card-inputs-sub">
            <div className="input-container">
              <p className="input-label">Address:</p>
              <input
                placeholder="Address..."
                onChange={val => this.handleInputText("address", val)}
                value={this.state.address}
              />
            </div>
            <div className="input-container gender-container">
              <label className="gender-label">
                Gender:
                <select
                  className="gender-selector"
                  value={this.state.gender}
                  onChange={this.handleGenderSelectChange}
                >
                  <option value="M">M</option>
                  <option value="F">F</option>
                </select>
              </label>
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
                          surname: this.state.surname,
                          address: this.state.address,
                          phone: this.state.phone,
                          gender: this.state.gender,
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

export default ModalUser;

const ADD_LEAD = gql`
  mutation createUser(
    $name: String!
    $surname: String!
    $email: String!
    $address: String!
    $phone: String!
    $gender: String!
    $category: String!
    $mentioned_by_company: String!
  ) {
    createUser(
      name: $name
      surname: $surname
      email: $email
      address: $address
      mentioned_by_company: $mentioned_by_company
      gender: $gender
      phone: $phone
      category: $category
    ) {
      name
      surname
      phone
      email
      address
      gender
      mentioned_by_company
      date
    }
  }
`;
