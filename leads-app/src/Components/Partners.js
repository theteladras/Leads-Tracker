import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Partners = props => {
  return (
    <Query
      query={GET_PARTNERS}
      variables={{ email: props.content.personal_data.email }}
      pollInterval={500}
    >
      {({ loading, error, data }) => {
        if (loading) return <p className="loading-text">Loading...</p>;
        if (error) return `Error! ${error.message}`;
        if (!data.mentionedFrom.length) {
          return <div className="partner-list">No partners.</div>;
        }
        return (
          <div className="partner-list">
            {data.mentionedFrom.map((comp, i) => (
              <p
                className="partner-text"
                key={`paragraph${i}`}
                onClick={() => props.selectedCompany(comp.mentioned_by_company)}
              >
                • {comp.mentioned_by_company}
              </p>
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default Partners;

const GET_PARTNERS = gql`
  query mentionedFrom($email: String!) {
    mentionedFrom(email: $email) {
      mentioned_by_company
    }
  }
`;
