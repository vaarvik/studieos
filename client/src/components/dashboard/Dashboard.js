import React, { Component } from "react";
import Popular from "./Popular";
import Search from "./Search";

class Dashboard extends Component {
  render() {
    return (
      <div className="container">
        <Search />
        <Popular />
      </div>
    );
  }
}

export default Dashboard;
