import React, { PureComponent } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import "../Main.css";

const SIGNUP = gql`
  mutation signup($username: String!, $email: String!, $company: String!) {
    signup(username: $username, email: $email, company: $company) {
      email
      username
      company
    }
  }
`;

class Signup extends PureComponent {
  state = {
    email: "",
    username: "",
    company: "",
    success: false,
    error: false,
    msg: ""
  };
  btnSign = data => {
    if (data) {
      this.signUpSuccess();
      setTimeout(() => this.props.changeScreen(0), 1000);
      return;
    }
  };
  errorMsgProcessor = () => {
    if (
      this.state.email === "" ||
      this.state.username === "" ||
      this.state.company === ""
    ) {
      return "Please fill in the form.";
    }
    return "The email or the company is alredy in use.";
  };
  signUpSuccess = () => {
    this.setState({
      success: true,
      error: false,
      msg: "Successfuly Registered!"
    });
  };
  signUpFail = () => {
    this.setState({
      success: false,
      error: true,
      msg: this.errorMsgProcessor()
    });
  };
  render() {
    return (
      <div className="login-page">
        <div className="flanker" />
        <div className="login-card">
          <div className="signin-title-container">
            <h3 className="signin-title login-title">Leads Tracker</h3>
            <p className="signin-paragraph">Fill in the form to register.</p>
            <p
              className="signin-paragraph"
              style={{
                color:
                  (this.state.error && "red") || (this.state.success && "green")
              }}
            >
              {this.state.msg}
            </p>
          </div>
          <div className="input-container">
            <div className="input-sub-container">
              <p>Email:</p>
              <input
                placeholder="Enter email..."
                onChange={val => this.setState({ email: val.target.value })}
                onFocus={() => this.setState({ msg: "" })}
                value={this.state.email}
              />
            </div>
            <div className="input-sub-container">
              <p>Username:</p>
              <input
                placeholder="Enter username..."
                onChange={val => this.setState({ username: val.target.value })}
                onFocus={() => this.setState({ msg: "" })}
                value={this.state.username}
              />
            </div>
            <div className="input-sub-container">
              <p>Company name:</p>
              <input
                placeholder="Enter company..."
                onChange={val => this.setState({ company: val.target.value })}
                onFocus={() => this.setState({ msg: "" })}
                value={this.state.company}
              />
            </div>
          </div>
          <div className="signup-btn-container">
            <button
              className="btn signup-btn cancel"
              onClick={() => this.props.changeScreen(0)}
            >
              Cancel
            </button>
            <ApolloConsumer>
              {client => (
                <div>
                  <button
                    className="btn signup-btn"
                    onClick={async () => {
                      client
                        .mutate({
                          mutation: SIGNUP,
                          variables: {
                            company: this.state.company,
                            username: this.state.username,
                            email: this.state.email
                          }
                        })
                        .then(data => {
                          this.btnSign(data);
                        })
                        .catch(e => this.signUpFail());
                    }}
                  >
                    Submit!
                  </button>
                </div>
              )}
            </ApolloConsumer>
          </div>
          <div style={{ height: 20 }} />
        </div>
        <div className="flanker" />
      </div>
    );
  }
}

export default Signup;
