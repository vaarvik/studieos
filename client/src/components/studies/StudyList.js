import React, { Component } from "react";
import StudySummary from "./StudySummary";
import { connect } from "react-redux";

class StudyList extends Component {
  state = {
    counter: 1
  };
  render() {
    const studyList = this.props.studies ? (
      <ul className="study-list">
        {this.props.studies.map(study => {
          return (
            <li
              key={study.Id_soekerportal}
              onClick={() => {
                this.props.click(study.Id_soekerportal);
              }}
            >
              <StudySummary study={study} />
            </li>
          );
        })}
      </ul>
    ) : (
      <p>Loading</p>
    );
    return <div>{studyList}</div>;
  }
}

const mapStateToProps = state => {
  return {
    studies: state.study.slice(0, 12)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    click: click =>
      dispatch({
        type: "CLICKED",
        click
      })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudyList);
