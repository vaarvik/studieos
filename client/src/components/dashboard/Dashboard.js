import React, { Component } from "react";
import SelectedStudy from "./SelectedStudy";
import Search from "./Search";

class Dashboard extends Component {
  render() {
    const showSelectedStudy = this.props.match.params.study_id ? (
      <SelectedStudy
        study={this.props}
        pageId={this.props.match.params.study_id}
      />
    ) : null;
    return (
      <React.Fragment>
        <Search pageId={this.props.match.params.study_id} />
        {showSelectedStudy}
      </React.Fragment>
    );
  }
}

export default Dashboard;
