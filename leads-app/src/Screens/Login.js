import React, { PureComponent } from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import "../Main.css";

class Login extends PureComponent {
  state = {
    login_value: "",
    data: null,
    error: ""
  };

  btnLogin = (leads_data, personal_data) => {
    if (leads_data.login) {
      this.props.changeScreen(2, { leads_data, personal_data });
    }
  };

  btnFail = () => {
    this.setState({
      error:
        this.state.login_value === ""
          ? "Please enter an email!"
          : "The provided email does not exist, please register first."
    });
  };

  render() {
    return (
      <div className="login-page">
        <div className="flanker" />
        <div className="login-card">
          <div className="login-title-container">
            <h3 className="login-title">Leads Tracker</h3>
            <p className="login-instruction">
              Login using the registered Email address.
            </p>
            <p className="error-report">{this.state.error}</p>
          </div>
          <div className="login-input-container">
            <input
              placeholder="example@example.com"
              value={this.state.login_value}
              onChange={val => this.setState({ login_value: val.target.value })}
              onFocus={() => this.setState({ error: "" })}
            />
            <ApolloConsumer>
              {client => (
                <div>
                  <button
                    className="btn login-btn"
                    onClick={async () => {
                      try {
                        const login_request = await client.mutate({
                          mutation: LOGIN,
                          variables: { email: this.state.login_value }
                        });
                        const personal_info = await client.query({
                          query: PERSONAL_INFO,
                          variables: { email: this.state.login_value }
                        });
                        localStorage.setItem(
                          "login_data",
                          JSON.stringify({
                            leads_data: login_request.data,
                            personal_data: personal_info.data.personalInfo
                          })
                        );
                        this.btnLogin(
                          login_request.data,
                          personal_info.data.personalInfo
                        );
                      } catch (e) {
                        this.btnFail();
                      }
                    }}
                  >
                    Login
                  </button>
                </div>
              )}
            </ApolloConsumer>
          </div>
          <div className="login-btn-container">
            <button
              className="btn signup-btn"
              onClick={() => this.props.changeScreen(1)}
            >
              Signup
            </button>
          </div>
        </div>
        <div className="flanker" />
      </div>
    );
  }
}

export default Login;

const LOGIN = gql`
  mutation login($email: String!) {
    login(email: $email) {
      email
      name
      surname
      contact
      phone
      web
      gender
    }
  }
`;
const PERSONAL_INFO = gql`
  query personalInfo($email: String!) {
    personalInfo(email: $email) {
      company
      email
      username
      managers
    }
  }
`;
