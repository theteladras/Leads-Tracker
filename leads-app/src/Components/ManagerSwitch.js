import React, { PureComponent } from "react";
import { Query, ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import Switch from "react-input-switch";

export default class ManagerSwitch extends PureComponent {
  state = {
    switch: 0
  };
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query
            query={GET_MANAGERS}
            variables={{ email: this.props.personal_data.email }}
          >
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <p style={{ fontSize: 8, textAlign: "center" }}>Loading...</p>
                );
              if (error) return `Error! ${error.message}`;
              this.setState({
                switch:
                  data.personalInfo.managers.includes(this.props.item.email) &&
                  1
              });
              return (
                <Switch
                  value={this.state.switch}
                  onChange={async switch_value => {
                    let manager;
                    try {
                      if (!switch_value) {
                        manager = await client.mutate({
                          mutation: REMOVE_MANAGER,
                          variables: {
                            email: this.props.personal_data.email,
                            email_to_remove: this.props.item.email
                          }
                        });
                      } else {
                        manager = await client.mutate({
                          mutation: SET_MANAGER,
                          variables: {
                            email: this.props.personal_data.email,
                            email_to_add: this.props.item.email
                          }
                        });
                      }
                      if (manager.data) {
                        client.queryManager.refetchQueryByName("personalInfo");
                      } else {
                        this.setState({ switch: false });
                      }
                    } catch (e) {
                      this.setState({ switch: false });
                    }
                  }}
                />
              );
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

const SET_MANAGER = gql`
  mutation addManager($email: String!, $email_to_add: String!) {
    addManager(email: $email, email_to_add: $email_to_add) {
      managers
    }
  }
`;

const REMOVE_MANAGER = gql`
  mutation removeManager($email: String!, $email_to_remove: String!) {
    removeManager(email: $email, email_to_remove: $email_to_remove) {
      managers
    }
  }
`;

const GET_MANAGERS = gql`
  query personalInfo($email: String!) {
    personalInfo(email: $email) {
      managers
    }
  }
`;
