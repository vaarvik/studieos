import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getSchoolsQuery } from "../queries/queries";

class ButComp extends Component {
  render() {
    return (
      <button
        onClick={() => {
          console.log(this.props);
        }}
      >
        Click me
      </button>
    );
  }
}

export default graphql(getSchoolsQuery)(ButComp);
