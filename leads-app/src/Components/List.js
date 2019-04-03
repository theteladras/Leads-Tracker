import React, { PureComponent } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import ListItem from "./ListItem";
import PLUS_ICON from "../Assets/plus.png";

class List extends PureComponent {
  sortDataArr = array => {
    if (this.props.sort === "alpha") {
      return array.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return textA > textB ? -1 : textA < textB ? 1 : 0;
      });
    }
    return array.sort(function(a, b) {
      var dateA = new Date(a.date),
        dateB = new Date(b.date);
      return dateA - dateB;
    });
  };
  render() {
    return (
      <Query
        query={LEADS_DATA}
        variables={{
          company: this.props.content
            ? this.props.content.personal_data.company
            : this.props.selected_company
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          if (!data.allLeads.length) {
            return (
              <div className="no-active-leads">
                <p className="no-active-leads-paragraph">
                  No active trackings. Add a lead to track.
                </p>
                <div className="plus-icon-container">
                  <img
                    src={PLUS_ICON}
                    alt="plus"
                    className="plus-icon"
                    onClick={this.props.handleAdd}
                  />
                </div>
              </div>
            );
          }
          let sorted_data = this.sortDataArr(data.allLeads);
          return sorted_data
            .map((item, i) => {
              return (
                <ListItem
                  is_manager={this.props.is_manager}
                  item={item}
                  key={`item${i}`}
                  sort={this.props.sort}
                  personal_data={
                    this.props.content
                      ? this.props.content.personal_data
                      : undefined
                  }
                />
              );
            })
            .reverse();
        }}
      </Query>
    );
  }
}

export default List;

const LEADS_DATA = gql`
  query allLeads($company: String!) {
    allLeads(company: $company) {
      _id
      name
      surname
      contact
      email
      address
      gender
      phone
      web
      category
      date
    }
  }
`;
