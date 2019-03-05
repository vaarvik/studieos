import React, { Component } from "react";
import teacher from "../../assets/img/teaching.jpg";
import StudyDetails from "../studies/StudyDetails";

class SelectedStudy extends Component {
  state = {
    cols: 1
  };

  setCols = () => {
    this.setState({
      cols: 5
    });
    return 5;
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.refs.selectedStudy.classList.add("col-5-8");
    }, 0);
  };

  render() {
    const linearGradient = `
    linear-overlay-${Math.floor(Math.random() * 360)}`;

    return (
      <div className={`study-selected no-width`} ref="selectedStudy">
        <div>
          <div className={`${linearGradient} overlay`} />
          <div className="overlay-circle" />
          <img className="topic-image" src={teacher} alt="topic" />
          <div className="study-details">
            <StudyDetails study={this.props.study} />
          </div>
        </div>
      </div>
    );
  }
}

export default SelectedStudy;
