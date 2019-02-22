import React, { Component } from "react";
import { connect } from "react-redux";
import RateStudy from "./RateStudy";

class StudyDetails extends Component {
  render() {
    const { study } = this.props;
    return (
      <div>
        <h1>{study.Studiumnavn}</h1>
        <h2>
          {study.Laerestednavn} ({study.Laerestedkode})
        </h2>
        <h3>{study.Undervisningssted}</h3>
        <h4>Emne: {study.Utdomrkode}</h4>
        <h3>{study.Id_soekerportal}</h3>
        <h4>Studieplasser: {study.Antall_budsj_studieplasser}</h4>
        <a href={study.Url} style={{ color: "blue" }}>
          {study.Url}
        </a>
        <RateStudy currentElement={this.props.match.params.study_id} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.study_id;
  return {
    study: state.study.find(study => {
      return study.Id_soekerportal == id;
    })
  };
};

export default connect(mapStateToProps)(StudyDetails);
