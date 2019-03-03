import React, { Component } from "react";
import { connect } from "react-redux";
import StudyList from "../studies/StudyList";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    dropDownSearch: false,
    dropDownLocation: false,
    regMes: null,
    searchStudies: this.props.studies
  };

  displayRegMessage = valid => {
    const temp = valid ? (
      <p style={{ color: "red" }}>You can't write it like that.</p>
    ) : null;
    this.setState({
      regMes: temp
    });
  };

  triggerOnlyOneDropDown = () => {
    if (this.state.dropDownSearch) {
      this.setState({
        dropDownLocation: false
      });
      console.log("show search onlyt", this.state.dropDownSearch);
    }
    if (this.state.dropDownLocation) {
      this.setState({
        dropDownSearch: false
      });
      console.log("show location onlyt", this.state.dropDownLocation);
    }
    console.log(this.state);
  };

  validateInput = (e, type) => {
    let reg = /^( |,|-|[a-å]+)+$/gi;
    let focus = `dropDown${type}`;
    if (!reg.test(e.target.value) && e.target.value) {
      this.setState({
        [focus]: false
      });
      this.displayRegMessage(true);
    } else if (e.target.value) {
      this.setState({
        [focus]: true
      });
      this.displayRegMessage(false);
      console.log(focus, true);
    } else {
      this.setState({
        [focus]: false
      });
      this.displayRegMessage(false);
    }
  };

  sortArray = array => {
    array.sort(function(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
    });
  };

  toggleSearch = (e, type) => {
    this.validateInput(e, type);
    this.triggerOnlyOneDropDown();
    let validStudies = [];
    let termArray = [];
    this.props.studies.map(study => {
      let studyArray = [];
      let lcStudyName = study.name.toLowerCase();
      let lcTerm = e.target.value.toLowerCase();
      if (lcTerm.includes(" ")) {
        studyArray = lcStudyName.trim().split(" ");
        termArray = lcTerm.trim().split(" ");
      }
      if (termArray.length < 2 && lcStudyName.indexOf(lcTerm) != -1) {
        validStudies.push(study);
      }
    });
    this.sortArray(validStudies);
    this.setState({ searchStudies: validStudies });
  };

  render() {
    const dropDown = this.state.dropDownSearch ? (
      <ul className="study-dropdown">
        {this.state.searchStudies.map(study => {
          return (
            <Link to={`/studies/${study.id}`} key={study.id}>
              <li>{study.name}</li>
            </Link>
          );
        })}
      </ul>
    ) : null;
    let locations = [];
    const dropDownLocation = this.state.dropDownLocation ? (
      <ul className="study-location-dropdown">
        {this.state.searchStudies.map(study => {
          for (let i in locations) {
            if (locations[i].location === study.location) return;
          }
          locations.push(study);
          return <li>{study.location}</li>;
        })}
      </ul>
    ) : null;

    const studySelected = this.props.pageId ? 3 : 8;

    return (
      <div className={`study-search col-${studySelected}-8`}>
        <div className="overlay-circle" />
        <div class="study-search-content">
          <Link to={"/"}>
            <h1>Studieoversikten</h1>
          </Link>
          <Link to="/map">
            <h2>Søk blant studier</h2>
          </Link>
          <input
            id="main-search"
            placeholder="Søk etter studie"
            onKeyUp={e => {
              this.toggleSearch(e, "Search");
            }}
          />
          {this.state.regMes}
          {dropDown}
          <input
            id="location-search"
            placeholder="Studiested"
            onKeyUp={e => {
              this.toggleSearch(e, "Location");
            }}
          />
          {dropDownLocation}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    studies: state.study.map(single => {
      return {
        name: single.Studiumnavn,
        id: single.Id_soekerportal,
        location: single.Undervisningssted
      };
    }),
    pageId: ownProps.pageId
  };
};

export default connect(mapStateToProps)(Search);
