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
    const ss = document.getElementsByClassName("study-selected")[0];
    console.log(ss);
    setTimeout(() => {
      ss.classList.add("col-5-8");
      console.log(ss);
    }, 0);
  };

  render() {
    const linearGradient = `
    linear-overlay-${Math.floor(Math.random() * 360)}`;
    const radialGradient = `radial-overlay`;

    const col = this.props.pageId ? `col-5-8` : `col-1-8`;

    return (
      <div className={`study-selected no-width`}>
        <div>
          <div className={`${linearGradient} overlay`} />
          <div className="overlay-circle" />
          <img className="topic-image" src={teacher} />
          <div className="study-details">
            <StudyDetails study={this.props.study} />
          </div>
        </div>
      </div>
    );
  }
}

export default SelectedStudy;
