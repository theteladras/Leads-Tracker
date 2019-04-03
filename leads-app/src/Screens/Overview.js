import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import List from "../Components/List";
import BACK_ICON from "../Assets/back.png";

export default class Overview extends PureComponent {
  state = {
    manager: false
  };
  render() {
    return (
      <div className="overview-container">
        <div className="overview-header">
          <img
            src={BACK_ICON}
            alt="back arrow"
            className="back_from_overview"
            onClick={() => this.props.goBack()}
          />
          <h3>
            Company:{" "}
            <i style={{ color: "#fff" }}>{this.props.selected_company}</i>
          </h3>
          <h6>status: {this.state.manager ? "Manager" : "User"}</h6>
        </div>
        <Query
          query={GET_MANAGERS}
          variables={{ company: this.props.selected_company }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p className="loading-text">Loading...</p>;
            if (error) return `Error! ${error.message}`;
            let is_manager = data.getManagers.managers.includes(
              this.props.personal_email
            );
            this.setState({ manager: is_manager });
            return (
              <List
                selected_company={this.props.selected_company}
                is_manager={is_manager}
              />
            );
          }}
        </Query>
      </div>
    );
  }
}

const GET_MANAGERS = gql`
  query getManagers($company: String!) {
    getManagers(company: $company) {
      managers
    }
  }
`;
