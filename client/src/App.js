import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/layout/Navbar";
import StudyDetails from "./components/studies/StudyDetails";
import Mape from "./components/studies/Map";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            {/* <Navbar /> */}
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/studies/:study_id" component={Dashboard} />
            </Switch>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
