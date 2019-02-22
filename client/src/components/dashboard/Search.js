import React, { Component } from "react";
import StudyList from "../studies/StudyList";

export default class Search extends Component {
  render() {
    return (
      <div className="col c2-3 ">
        <h2>Søk blant studier</h2>
        <hr />
        <StudyList />
      </div>
    );
  }
}
