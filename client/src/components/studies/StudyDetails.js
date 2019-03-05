import React, { Component } from "react";
import { connect } from "react-redux";
import RateStudy from "./RateStudy";
import StudyLocation from "./StudyLocation";

class StudyDetails extends Component {
  render() {
    const { study } = this.props;
    return (
      <div>
        <h3>{study.Studiumnavn}</h3>
        <RateStudy
          currentElement={this.props.urlId.study.match.params.study_id}
        />
        <h4>
          {study.Laerestednavn} ({study.Laerestedkode})
        </h4>
        <StudyLocation location={study.Undervisningssted} />
        <h6>Emne: {study.Utdomrkode}</h6>
        <p>Studieplasser: {study.Antall_budsj_studieplasser}</p>
        <a href={study.Url} style={{ color: "blue" }}>
          {study.Url}
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.study.match.params.study_id;
  return {
    study: state.study.find(study => {
      return study.Id_soekerportal === id;
    }),
    urlId: ownProps
  };
};

export default connect(mapStateToProps)(StudyDetails);
