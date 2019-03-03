import React, { Component } from "react";
import { connect } from "react-redux";

class RateStudy extends Component {
  state = {
    totalRating: this.props.study.currentRating / this.props.study.votes
  };
  setRating = i => {
    const { study } = this.props;
    this.props.rating(study.currentRating, i, this.props.currentElement);
    this.setState({
      totalRating: this.props.study.currentRating / this.props.study.votes
    });
  };

  hoverSiblings = e => {
    for (let i = 0; i < e.target.id; i++) {
      e.target.parentElement.children[i].classList.toggle("active");
      e.target.parentElement.children[i].innerText = "";
    }
    if (e.target.className != "rating-star active");
    e.target.innerText = "";
    e.target.parentElement.lastChild.classList.toggle("hide");
    e.target.parentElement.lastChild.classList.toggle("z-back");
    document.createElement("div");
  };

  zBack = e => {
    e.target.classList.toggle("z-back");
    console.log(window.getComputedStyle(e.target));
  };

  displayStar = () => {
    var temp = [];
    for (var i = 1; i <= 5; i++) {
      let tempI = i;
      temp.push(
        <div
          key={tempI}
          id={tempI}
          className="rating-star"
          onClick={() => {
            this.setRating(tempI);
          }}
          onMouseEnter={this.hoverSiblings}
          onMouseLeave={this.hoverSiblings}
        >
          
        </div>
      );
    }
    return temp;
  };

  componentDidUpdate = (prevProps, prevState) => {
    console.log("prevP", prevProps);
    console.log("prevS", prevState);
    if (prevState === this.state) {
      this.setState({
        totalRating: this.props.study.currentRating / this.props.study.votes
      });
    }
    let ti = document.getElementById("rate-study");
    console.log(window.getComputedStyle(ti));
  };

  componentDidMount = () => {};

  render() {
    const percentageRating = this.props.study.currentRating
      ? (this.state.totalRating / 5) * 100
      : 0;
    const rating = !this.props.study.currentRating ? (
      <span>Not Rated</span>
    ) : (
      <span>({this.state.totalRating.toFixed(2)})</span>
    );

    return (
      <div className="rate-study" id="rate-study">
        <div>
          {this.displayStar()}
          <div
            className="star-color"
            style={{ width: `${percentageRating}%` }}
            onMouseEnter={this.zBack}
            onMouseLeave={this.zBack}
          />
        </div>
        {rating}
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
      let tempCurrent;
      if (current) {
        tempCurrent = current;
      } else {
        tempCurrent = 0;
      }
      dispatch({
        type: "STUDY_RATED",
        currentRating: tempCurrent + score,
        id
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RateStudy);
