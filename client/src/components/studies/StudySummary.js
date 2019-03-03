import React, { Component } from "react";
import { Link } from "react-router-dom";

const StudySummary = props => {
  return (
    <Link to={`/studies/${props.study.Id_soekerportal}`}>
      <h3>{props.study.Studiumnavn}</h3>
      <h4>{props.study.Laerestednavn}</h4>
      <h5>{props.study.Undervisningssted}</h5>
    </Link>
  );
};

export default StudySummary;
