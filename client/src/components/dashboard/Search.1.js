import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchDropDown from "../search/SearchDropDown";
import SeachStudyResults from "../search/SeachStudyResults";
import SearchTags from "../search/SearchTags";

class Search extends Component {
  state = {
    dropDowns: [
      {
        name: "name",
        operating: false,
        placeholder: "Søk etter studie"
      },
      {
        name: "location",
        operating: false,
        placeholder: "Studiested",
        tags: ["Bergen"]
      },
      {
        name: "category",
        operating: false,
        placeholder: "Emne",
        tags: []
      }
    ],
    regMes: null,
    locationTags: ["TITO"],
    categoryTags: ["KAAA"],
    searchStudies: [],

    resetStatus: keyword => {
      const temp = this.state.dropDowns.map(dropDown => {
        if (dropDown.name === keyword) dropDown.operating = false;
        return dropDown;
      });
      this.setState({
        dropDowns: temp
      });
      console.log("k3", this.state);
    }
  };

  createTagList = keyword => {
    //make component
    return (
      <ul id={`${keyword}-tags"`}>
        {this.state.dropDowns.map(dropDown => {
          if (dropDown.name === keyword) {
            dropDown.tags.map(tag => {
              console.log(tag, "coming up");
              return (
                <li
                  key={tag}
                  onClick={e => {
                    this.removeTag(e, keyword);
                  }}
                  className="searchTag"
                >
                  {tag}
                </li>
              );
            });
          }
        })}
      </ul>
    );
  };

  displayRegMessage = valid => {
    const message = valid ? (
      <p style={{ color: "red" }}>You can't write it like that.</p>
    ) : null;
    this.setState({
      regMes: message
    });
  };

  addTag = (e, type) => {
    let tog = this.state.dropDowns.find(dropDown => dropDown.name === type);

    const temp = this.state.dropDowns.map(dropDown => {
      if (dropDown.name === type) {
        const tagExists = tog.tags.find(tag => {
          if (tag === e.target.innerText) return true;
          return false;
        });
        if (tagExists) return null;
        tog.tags.push(e.target.innerText);
      }
      return dropDown;
    });

    console.log(temp);

    this.setState({
      dropDowns: temp
    });

    // const tagName = type + "Tags";
    // let tags = this.state[tagName];
    // const tagExists = tags.find(tag => {
    //   if (tag === e.target.innerText) return true;
    //   return false;
    // });
    // if (tagExists) return null;
    // tags.push(e.target.innerText);
    // this.setState({
    //   [tagName]: tags
    // });
  };

  removeTag = (e, type) => {
    // const tagName = type + "Tags";
    // let tags = this.state[tagName];

    let tog = this.state.dropDowns.find(dropDown => dropDown.name === type);
    const temp = this.state.dropDowns.map(dropDown => {
      if (dropDown.name === type) {
        return tog.tags.filter(tag => tag !== e.target.innerText);
      }
      return dropDown;
    });

    console.log("deleted", temp);

    this.setState({
      dropDowns: temp
    });

    // this.setState({
    //   [tagName]: tags.filter(tag => tag !== e.target.innerText)
    // });
  };

  resetOtherDropdowns = type => {
    const temp = this.state.dropDowns.map(dropDown => {
      dropDown.operating = false;
      if (dropDown.name === type) dropDown.operating = true;
      return dropDown;
    });
    this.setState({
      dropDowns: temp
    });
  };

  validateInput = (e, type) => {
    let reg = /^( |\(|\)|,|-|[a-å])+$/gi;
    if (!reg.test(e.target.value) && e.target.value) {
      this.setState({
        dropDowns: [...this.state.dropDowns, { name: type, operating: false }]
      });
      this.displayRegMessage(true);
    } else if (e.target.value) {
      this.setState({
        dropDowns: [...this.state.dropDowns, { name: type, operating: true }]
      });
      this.displayRegMessage(false);
    } else {
      this.setState({
        dropDowns: [...this.state.dropDowns, { name: type, type: false }]
      });
      this.displayRegMessage(false);
    }
  };

  sortArray = (array, type) => {
    //sort array in alphabetical order after type
    array.sort(function(a, b) {
      if (a[type] < b[type]) return -1;
      if (a[type] > b[type]) return 1;
      return null;
    });
  };

  getTagMatch = (element, elementProp, tagArray) => {
    //loop through the array tags
    for (let i in tagArray)
      if (elementProp === tagArray[i])
        //check if the current study array is equal to the location tag
        return element;
  };

  toggleSearch = (e, type) => {
    this.validateInput(e, type);
    //validate with regex

    this.resetOtherDropdowns(type);
    //only show one dropdown menu at the time

    const typeProp = type.toString().toLowerCase();

    const lcTerm = e.target.value.toLowerCase();

    const { dropDowns } = this.state; //this.state.dropdowns.[1].tags

    const locationTagsy = dropDowns[1].tags;
    const categoryTagsy = dropDowns[2].tags;

    let searchMatches = this.props.studies.filter(study => {
      let lcStudyProp = study[typeProp].toLowerCase().indexOf(lcTerm); //set the study property to lowercase

      if (lcStudyProp !== -1) {
        //check if the input value contain letters in the same order as a the study property
        if (type === "category") {
          //check if the input field that is active is category
          if (locationTagsy.length) {
            //check if there is any array tags added
            return this.getTagMatch(study, study.location, locationTagsy);
          } else {
            //return all if there is nothing in the array
            return study;
          }
        } else if (type === "location") {
          if (categoryTagsy.length) {
            //check if there is any array tags added
            return this.getTagMatch(study, study.category, categoryTagsy);
          } else {
            //return all if there is nothing in the array
            return study;
          }
        } else {
          //check if the input field that is active is not location
          if (locationTagsy.length && categoryTagsy.length) {
            //if there are both location tags and category tags return those that match both array's tags
            let locationMatch = this.getTagMatch(
              study,
              study.location,
              locationTagsy
            ); //set study that matches current the location tags to the variable locationMatch
            if (locationMatch) {
              //check if there the current study is a match
              return this.getTagMatch(study, study.category, categoryTagsy);
            } else return null;
          } else if (locationTagsy.length) {
            return this.getTagMatch(study, study.location, locationTagsy);
          } else if (categoryTagsy.length) {
            return this.getTagMatch(study, study.category, categoryTagsy);
          } else {
            //return all studies if there is no tags
            return study;
          }
        }
      }
      //return null if there is no inputs
      return null;
    });
    this.sortArray(searchMatches, typeProp);
    this.setState({ searchStudies: searchMatches });
    console.log(this.state.dropDowns);
  };

  render() {
    const { dropDowns } = this.state; //this.state.dropdowns.[1].tags

    const locationTagsy = dropDowns[1].tags;
    const categoryTagsy = dropDowns[2].tags;

    const locationTags = locationTagsy.length
      ? this.createTagList("location")
      : null;

    const categoryTags = categoryTagsy.length
      ? this.createTagList("category")
      : null;

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
          {this.state.regMes}
          {categoryTags}

          {locationTags}
          {this.state.dropDowns.map(dropDown => {
            if (dropDown.name === "name") {
              return (
                <SeachStudyResults
                  searchStudies={this.state.searchStudies}
                  keyword={dropDown.name}
                  resetStatus={this.state.resetStatus}
                  toggleSearch={this.toggleSearch}
                  placeholder={dropDown.placeholder}
                  operating={dropDown.operating}
                />
              );
            }
            return (
              <React.Fragment>
                <SearchDropDown
                  searchStudies={this.state.searchStudies}
                  keyword={dropDown.name}
                  addTag={this.addTag}
                  resetStatus={this.state.resetStatus}
                  toggleSearch={this.toggleSearch}
                  placeholder={dropDown.placeholder}
                  operating={dropDown.operating}
                />
                {/* <SearchTags /> */}
              </React.Fragment>
            );
          })}
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
        location: single.Undervisningssted,
        category: single.Utdomrkode,
        schoolCode: single.Laerestedkode
      };
    }),
    pageId: ownProps.pageId
  };
};

export default connect(mapStateToProps)(Search);
