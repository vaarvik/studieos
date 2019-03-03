import React, { Component } from "react";
import Mape from "./Map";

export class StudyLocation extends Component {
  render() {
    return (
      <div>
        <h5>Sted: {this.props.location}</h5>
        <Mape />
      </div>
    );
  }
}

export default StudyLocation;
