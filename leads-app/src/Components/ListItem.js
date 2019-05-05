import React, { Component } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import SwitchComponent from "./ManagerSwitch";
import DeleteButton from "./DeleteButton";
import EDIT_ICON from "../Assets/edit.png";
import CLOSE_ICON from "../Assets/close.png";
import OK_ICON from "../Assets/ok.png";

class ListItem extends Component {
  state = {
    item_id: "",
    name_input: false,
    surname_input: false,
    contact_input: false,
    email_input: false,
    phone_input: false,
    address_input: false,
    gender_input: false,
    web_input: false,
    switch: false,
    name_value: "",
    surname_value: "",
    contact_value: "",
    email_value: "",
    phone_value: "",
    address_value: "",
    gender_value: "",
    web_value: "",
    category: ""
  };

  componentDidMount() {
    this.setState({
      item_id: this.props.item._id,
      category: this.props.item.category,
      switch: this.props.personal_data
        ? this.props.personal_data.managers.includes(this.props.item.email) && 1
        : null
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.sort !== nextProps.sort || nextProps.sort === "alpha") {
      this.setState({ category: nextProps.item.category });
    }
  }

  renderEditIcon = args => {
    if (this.props.is_manager || this.props.personal_data) {
      return (
        <img
          src={EDIT_ICON}
          className="edit-icon"
          alt="edit"
          onClick={() => this.sectionEdit(args.state_name)}
        />
      );
    }
    return <div style={{ width: 20 }} />;
  };

  renderInput = args => {
    if (!this.state[args.state_name]) {
      return (
        <div className="sections">
          <p className="label">{args.label}</p>
          <div className="label-data-container">
            <div />
            <div className="data-style">
              {args.prop_name === "web" ? (
                <a href={`${this.props.item[args.prop_name]}`}>{`${
                  this.props.item[args.prop_name]
                }`}</a>
              ) : (
                <p>{`${this.props.item[args.prop_name]}`}</p>
              )}
            </div>
            {this.renderEditIcon(args)}
          </div>
        </div>
      );
    }
    return (
      <div className="sections">
        <p className="label">{args.label}</p>
        <div className="label-data-container">
          <div />
          {this.renderGenderSelector(args)}
          <div className="icons-container">
            {this.renderOKBtn(
              args.prop_name,
              this.state[args.state_input_value],
              args.state_name
            )}
            <img
              src={CLOSE_ICON}
              className="close-icon"
              alt="edit"
              onClick={() => this.sectionEdit(args.state_name)}
            />
          </div>
        </div>
      </div>
    );
  };

  renderGenderSelector = args => {
    if (args.prop_name !== "gender") {
      return (
        <input
          type="text"
          className="input-section"
          placeholder={`Edit the ${args.prop_name}...`}
          value={this.state[args.state_input_value]}
          onChange={val =>
            this.setState({ [args.state_input_value]: val.target.value })
          }
          onFocus={() => this.setState({ error: false })}
        />
      );
    }
    return (
      <select
        className="gender-selector"
        value={this.state.gender_value}
        onChange={this.handleGenderSelectChange}
        style={{ top: -10, left: 10 }}
      >
        <option value="M">M</option>
        <option value="F">F</option>
      </select>
    );
  };

  handleGenderSelectChange = val => {
    this.setState({ gender_value: val.target.value });
  };

  sectionEdit = state_name => {
    this.setState({ [state_name]: !this.state[state_name] });
  };
  genderOrWeb = () => {
    if (this.props.item.gender) {
      return (
        <div className="schema-container">
          {this.renderInput({
            state_name: "grender_input",
            state_input_value: "gender_value",
            prop_name: "gender",
            label: "Gender: "
          })}
        </div>
      );
    }
    return this.renderInput({
      state_name: "web_input",
      state_input_value: "web_value",
      prop_name: "web",
      label: "Website: "
    });
  };
  nameOrCompanyName = () => {
    if (this.props.item.surname) {
      return this.renderInput({
        state_name: "name_input",
        state_input_value: "name_value",
        prop_name: "name",
        label: "Name: "
      });
    }
    return this.renderInput({
      state_name: "name_input",
      state_input_value: "name_value",
      prop_name: "name",
      label: "Company name: "
    });
  };
  surnameOrContactName = () => {
    if (this.props.item.surname) {
      return this.renderInput({
        state_name: "surname_input",
        state_input_value: "surname_value",
        prop_name: "surname",
        label: "Surname: "
      });
    }
    return this.renderInput({
      state_name: "contact_input",
      state_input_value: "contact_value",
      prop_name: "contact",
      label: "Contact name: "
    });
  };
  renderOKBtn = (from_props, from_state, input_switch) => {
    return (
      <ApolloConsumer>
        {client => (
          <img
            src={OK_ICON}
            className="ok-icon"
            alt="edit"
            onClick={async () => {
              try {
                const edited_lead = await client.mutate({
                  mutation: this.props.item.gender
                    ? UPDATE_USER_LEAD
                    : UPDATE_COMPANY_LEAD,
                  variables: {
                    _id: this.props.item._id,
                    [from_props]: from_state
                  }
                });
                if (edited_lead.data) {
                  this.sectionEdit(input_switch);
                  client.queryManager.refetchQueryByName("allLeads");
                } else {
                  this.setState({ error: true });
                }
              } catch (e) {
                this.setState({ error: true });
              }
            }}
          />
        )}
      </ApolloConsumer>
    );
  };
  renderNoterBtn = noter_label => {
    if (this.props.is_manager || this.props.personal_data) {
      return (
        <ApolloConsumer>
          {client => (
            <div
              className={`noter_btn ${this.state.category === noter_label &&
                "noter_btn_selected"}`}
              onClick={async () => {
                this.setState({ category: noter_label });
                try {
                  const added_lead = await client.mutate({
                    mutation:
                      this.props.item.gender === null
                        ? UPDATE_COMPANY_LEAD
                        : UPDATE_USER_LEAD,
                    variables: {
                      _id: this.state.item_id,
                      category: noter_label
                    }
                  });
                  if (added_lead.data) {
                    client.queryManager.refetchQueryByName("allLeads");
                  } else {
                    this.setState({ error: true });
                  }
                } catch (e) {
                  this.setState({ error: true });
                }
              }}
            />
          )}
        </ApolloConsumer>
      );
    }
    return;
  };

  renderSwitch = () => {
    if (this.props.personal_data) {
      return (
        <div className="manager-switch">
          <p className="manager-text">Promote to manager:</p>
          <SwitchComponent {...this.props} />
        </div>
      );
    }
  };

  renderDeleteBtn = () => {
    if (this.props.personal_data || this.props.is_manager) {
      return <DeleteButton {...this.props} />;
    }
  };

  renderError = () => {
    if (this.state.error) {
      return (
        <p className="error-msg">
          There was an error while updating the field.
        </p>
      );
    }
  };

  render() {
    return (
      <div className="list-item">
        {this.renderError()}
        {this.renderSwitch()}
        {this.renderDeleteBtn()}
        <div
          className={`noter ${
            this.state.category === "Lost"
              ? "noter-red"
              : this.state.category === "New"
              ? "noter-blue"
              : "noter-green"
          }`}
        />
        <div className="noter-options">
          <div className="btn_holder">
            <p
              className={`noter_btn_label ${this.state.category === "New" &&
                "highlight"}`}
            >
              New
            </p>
            {this.renderNoterBtn("New")}
          </div>
          <div className="btn_holder">
            <p
              className={`noter_btn_label ${this.state.category === "Won" &&
                "highlight"}`}
            >
              Won
            </p>
            {this.renderNoterBtn("Won")}
          </div>
          <div className="btn_holder">
            <p
              className={`noter_btn_label ${this.state.category === "Lost" &&
                "highlight"}`}
            >
              Lost
            </p>
            {this.renderNoterBtn("Lost")}
          </div>
        </div>
        <div className="schema-container">
          {this.nameOrCompanyName()}
          {this.surnameOrContactName()}
        </div>
        <div className="schema-container">
          {this.renderInput({
            state_name: "email_input",
            state_input_value: "email_value",
            prop_name: "email",
            label: "Email: "
          })}
          {this.renderInput({
            state_name: "phone_input",
            state_input_value: "phone_value",
            prop_name: "phone",
            label: "Phone: "
          })}
        </div>
        <div className="schema-container">
          {this.renderInput({
            state_name: "address_input",
            state_input_value: "address_value",
            prop_name: "address",
            label: "Address: "
          })}
          {this.genderOrWeb()}
        </div>
      </div>
    );
  }
}

export default ListItem;

const UPDATE_USER_LEAD = gql`
  mutation editUser(
    $_id: String!
    $name: String
    $surname: String
    $email: String
    $address: String
    $phone: String
    $gender: String
    $category: String
  ) {
    editUser(
      _id: $_id
      name: $name
      surname: $surname
      email: $email
      address: $address
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
      category
      date
    }
  }
`;

const UPDATE_COMPANY_LEAD = gql`
  mutation editCompanyLead(
    $_id: String!
    $name: String
    $contact: String
    $email: String
    $address: String
    $phone: String
    $web: String
    $category: String
  ) {
    editCompanyLead(
      _id: $_id
      name: $name
      contact: $contact
      email: $email
      address: $address
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
      category
      date
    }
  }
`;
