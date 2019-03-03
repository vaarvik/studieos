import React, { Component } from "react";
import StudySummary from "./StudySummary";
import { connect } from "react-redux";
import ButComp from "../ButComp";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class StudyList extends Component {
  state = {
    counter: 1
  };
  displayStudyDetails = () => {};

  render() {
    const studyList = this.props.studies ? (
      <ul className="study-list">
        {this.props.studies.map(study => {
          return (
            <li key={study.Id_soekerportal}>
              <StudySummary study={study} />
            </li>
          );
        })}
      </ul>
    ) : (
      <p>Loading</p>
    );
    return (
      <div>
        {studyList}
        <ApolloProvider client={client}>
          <ButComp />
        </ApolloProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    studies: state.study.slice(0, 12)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyList);
