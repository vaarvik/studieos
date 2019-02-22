import React, { Component } from "react";
import { connect } from "react-redux";

class RateStudy extends Component {
  state = {
    totalRating: this.props.study.currentRating / this.props.study.votes
  };
  render() {
    const { study } = this.props;
    console.log(study.currentRating, study.votes);
    if (!this.state.totalRating) {
      this.state.totalRating = <p>No rating</p>;
    }
    return (
      <div className="rate_study">
        <span
          onClick={() => {
            this.props.rating(
              study.currentRating,
              1,
              this.props.currentElement
            );
            this.setState({
              totalRating:
                this.props.study.currentRating / this.props.study.votes
            });
          }}
        >
          ☆
        </span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <span>☆</span>
        <h4>Rating: {this.state.totalRating}</h4>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.currentElement;
  console.log(id);
  return {
    study: state.study.find(study => {
      return study.Id_soekerportal == id;
    })
  };
};

const mapDispatchToProps = (dispatch, score) => {
  return {
    rating: (current, score, id) => {
      console.log(current);
      dispatch({
        type: "STUDY_RATED",
        currentRating: current + score,
        id
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateStudy);
