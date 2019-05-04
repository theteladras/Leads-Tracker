import React from "react";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
import DELETE_ICON from "../Assets/delete.png";

export default function DeleteButton(props) {
  return (
    <ApolloConsumer>
      {client => (
        <div
          className={`delete-holder ${props.is_manager && "delete-overview"}`}
          onClick={async () => {
            console.log(props.personal_data._id);
            try {
              const added_lead = await client.mutate({
                mutation: props.item.gender
                  ? DELETE_USER_LEAD
                  : DELETE_COMPANY_LEAD,
                variables: {
                  _id: props.item._id
                }
              });
              if (added_lead.data) {
                client.queryManager.refetchQueryByName("allLeads");
              }
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <img src={DELETE_ICON} className="delete-icon" alt="trash can" />
        </div>
      )}
    </ApolloConsumer>
  );
}

const DELETE_USER_LEAD = gql`
  mutation deleteUserLead($_id: String!) {
    deleteUserLead(_id: $_id) {
      name
    }
  }
`;

const DELETE_COMPANY_LEAD = gql`
  mutation deleteCompanyLead($_id: String!) {
    deleteCompanyLead(_id: $_id) {
      name
    }
  }
`;
