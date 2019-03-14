import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SearchFilter from "../search/SearchFilter";

class Search extends Component {
  state = {
    dropDowns: [
      {
        name: "name",
        operating: false,
        placeholder: "Søk etter studie",
        type: "results"
      },
      {
        name: "location",
        type: "dropdown",
        operating: false,
        placeholder: "Studiested",
        tags: []
      },
      {
        name: "category",
        type: "dropdown",
        operating: false,
        placeholder: "Emne",
        tags: []
      },
      {
        name: "school",
        type: "dropdown",
        operating: false,
        placeholder: "Skole",
        tags: []
      },
      {
        name: "requirement",
        type: "dropdown",
        operating: false,
        placeholder: "Opptakskrav",
        tags: []
      },
      {
        name: "degree",
        type: "checkbox",
        operating: true,
        placeholder: "Studiegrad",
        tags: []
      }
    ],
    regMes: null,
    searchStudies: [],
    resetStatus: keyword => {
      const temp = this.state.dropDowns.map(dropDown => {
        if (dropDown.name === keyword) dropDown.operating = false;
        return dropDown;
      });
      this.setState({
        dropDowns: temp
      });
    }
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
    this.state.dropDowns.map(dropDown => {
      if (dropDown.name === type) {
        const tagExists = dropDown.tags.find(tag => {
          if (
            tag.toLowerCase() ===
            e.target.attributes["value"].value.toLowerCase()
          ) {
            return true;
          }
          return false;
        });
        if (tagExists) return dropDown;
        dropDown.tags.push(e.target.attributes["value"].value);
      }
      return dropDown;
    });
  };

  removeTag = (e, type) => {
    const newArray = this.state.dropDowns.map(dropDown => {
      if (dropDown.name === type) {
        dropDown.tags = dropDown.tags.filter(
          tag => tag !== e.target.attributes["value"].value
        );
      }
      return dropDown;
    });
    this.setState({
      dropDowns: newArray
    });
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

  nestedMatch = (tags1, tags2, study) => {
    if (tags2.length) {
      //if there are both location tags and category tags return those that match both array's tags
      let locationMatch = this.getTagMatch(study, study.location, tags1); //set study that matches current the location tags to the variable locationMatch
      if (locationMatch) {
        //check if there the current study is a match
        return this.getTagMatch(study, study.school, tags2);
      } else return null;
    }
    //return this if only tags1.length
    return this.getTagMatch(study, study.location, tags1);
  };

  filterSearch = (study, tagList) => {
    let isTags = false;
    let singleStudy = null;
    for (let i in tagList) {
      if (tagList[i].tags.length) {
        isTags = true;
        let match = this.getTagMatch(
          study,
          study[tagList[i].type],
          tagList[i].tags
        );
        if (!match) {
          return null;
        } else {
          singleStudy = study;
        }
      }
    }
    if (isTags) return singleStudy;
    else return study;
  };

  toggleSearch = (e, type) => {
    this.validateInput(e, type);
    //validate with regex

    this.resetOtherDropdowns(type);
    //only show one dropdown menu at the time

    const typeProp = type.toString().toLowerCase();
    const lcTerm = e.target.value.toLowerCase();
    let tagListArray = [];

    this.state.dropDowns.map(dropDown => {
      if (dropDown.name !== "name" && dropDown.name !== type) {
        tagListArray.push({
          tags: dropDown.tags,
          type: dropDown.name
        });
      }
    });

    let searchMatches = this.props.studies.filter(study => {
      let lcStudyProp = study[typeProp].toLowerCase().indexOf(lcTerm); //set the study property to lowercase

      //loop through the searchFieldsArray
      if (lcStudyProp !== -1) {
        return this.filterSearch(study, tagListArray);
      }
      return null;
    });
    this.sortArray(searchMatches, typeProp);
    this.setState({ searchStudies: searchMatches });
  };

  render() {
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
          {this.state.dropDowns.map(filter => {
            return (
              <SearchFilter
                searchStudies={this.state.searchStudies}
                keyword={filter.name}
                addTag={this.addTag}
                resetStatus={this.state.resetStatus}
                toggleSearch={this.toggleSearch}
                placeholder={filter.placeholder}
                operating={filter.operating}
                removeTag={this.removeTag}
                array={filter.tags}
                tag={filter.type}
                rawArray={this.props.studies}
              />
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
        school: single.Laerestednavn,
        schoolCode: single.Laerestedkode,
        requirement: single.Kompregelverk,
        degree: single.Varighet
      };
    }),
    pageId: ownProps.pageId
  };
};

export default connect(mapStateToProps)(Search);
