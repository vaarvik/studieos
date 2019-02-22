import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class StudySummary extends Component {
  render() {
    return (
      <Link to={`/studies/${this.props.study.Id_soekerportal}`}>
        <h5>{this.props.study.Laerestednavn}</h5>
        <h4>{this.props.study.Undervisningssted}</h4>
        <h3>{this.props.study.Studiumnavn}</h3>
        <hr />
      </Link>
    );
  }
}
