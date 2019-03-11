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
        tags: []
      },
      {
        name: "category",
        operating: false,
        placeholder: "Emne",
        tags: []
      },
      {
        name: "school",
        operating: false,
        placeholder: "Skole",
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
          if (tag.toLowerCase() === e.target.innerText.toLowerCase()) {
            return true;
          }
          return false;
        });
        if (tagExists) return dropDown;
        dropDown.tags.push(e.target.innerText);
      }
      return dropDown;
    });
  };

  removeTag = (e, type) => {
    const newArray = this.state.dropDowns.map(dropDown => {
      if (dropDown.name === type) {
        dropDown.tags = dropDown.tags.filter(tag => tag !== e.target.innerText);
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

  // getMatchTags = (study, dropDown, result) => {
  //   dropDown.tags.map(tag => {
  //     if (study[dropDown.name] === tag) {
  //       result = study;
  //       // console.log("study", study);
  //       // console.log("type", type);
  //       // console.log("tag", tag);
  //       // console.log("dropdown", dropDown);
  //       //return the study
  //       // return study;
  //     }
  //   });
  //   return result;
  // };

  // numberOfTagLists = array => {
  //   let counter = 0;

  //   for (let i in array) {
  //     if (array[i].tags.length) {
  //       counter++;
  //     }
  //   }

  //   return counter;
  // };

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

  filterSearch = (study, tags1, tags2) => {
    if (tags1.length) {
      return this.nestedMatch(tags1, tags2, study);
    } else if (tags2.length) {
      return this.getTagMatch(study, study.school, tags2);
    } else {
      //return all studies if there are no tags
      return study;
    }
  };

  filterSearchNew = (otherTags1, otherTags2, study) => {
    if (otherTags1.tags.length && otherTags2.tags.length) {
      //if there are both category tags and school tags return those that match both array's tags
      let categoryMatch = this.getTagMatch(
        study,
        study[otherTags1.type],
        otherTags1.tags
      ); //set study that matches current the category tags to the variable categoryMatch
      if (categoryMatch) {
        //check if there the current study is a match
        return this.getTagMatch(study, study[otherTags2.type], otherTags2.tags);
      } else return null;
    } else if (otherTags1.tags.length) {
      return this.getTagMatch(study, study[otherTags1.type], otherTags1.tags);
    } else if (otherTags2.tags.length) {
      return this.getTagMatch(study, study[otherTags2.type], otherTags2.tags);
    } else {
      //return all studies if there is no tags
      return study;
    }
  };

  toggleSearch = (e, type) => {
    this.validateInput(e, type);
    //validate with regex

    this.resetOtherDropdowns(type);
    //only show one dropdown menu at the time

    const typeProp = type.toString().toLowerCase();
    const lcTerm = e.target.value.toLowerCase();
    let tagListArray = [];
    let comparisonArray = [];

    this.state.dropDowns.map(dropDown => {
      if (dropDown.name !== "name" && dropDown.name !== type) {
        tagListArray.push({
          tags: dropDown.tags,
          type: dropDown.name
        });
      }
    });

    const locationTags = this.state.dropDowns[1].tags;
    const categoryTags = this.state.dropDowns[2].tags;
    const schoolTags = this.state.dropDowns[3].tags;
    const otherTags1 = tagListArray[0];
    const otherTags2 = tagListArray[1];

    console.log(tagListArray);

    // let totaltags = 0;

    // if (this.numberOfTagLists(tagListArray) > 1) {
    //   for (let i in tagListArray) {
    //     if (
    //       this.getTagMatch(
    //         study,
    //         study[tagListArray[i].type],
    //         tagListArray[i].tags
    //       )
    //     )
    //       comparisonArray.push(
    //         this.getTagMatch(
    //           study,
    //           study[tagListArray[i].type],
    //           tagListArray[i].tags
    //         )
    //       );
    //   }
    // }
    // for (let i in tagListArray) {
    //   totaltags += tagListArray[i].tags.length;
    //   if (tagListArray[i].tags.length) {
    //     return this.getTagMatch(
    //       study,
    //       study[tagListArray[i].type],
    //       tagListArray[i].tags
    //     );
    //   }
    // }

    // if (totaltags) {
    //   return null;
    // } else {
    //   return study;
    // }

    let searchMatches = this.props.studies.filter(study => {
      let lcStudyProp = study[typeProp].toLowerCase().indexOf(lcTerm); //set the study property to lowercase

      //loop through the searchFieldsArray
      if (lcStudyProp !== -1) {
        // if (type) {
        return this.filterSearchNew(otherTags1, otherTags2, study);
        // }

        // if (type === "location") {

        //   return this.filterSearchNew(otherTags1, otherTags2, study);

        /*

          if (otherTags1.tags.length && otherTags2.tags.length) {
            //if there are both category tags and school tags return those that match both array's tags
            let categoryMatch = this.getTagMatch(
              study,
              study[otherTags1.type],
              otherTags1.tags
            ); //set study that matches current the category tags to the variable categoryMatch
            if (categoryMatch) {
              //check if there the current study is a match
              return this.getTagMatch(
                study,
                study[otherTags2.type],
                otherTags2.tags
              );
            } else return null;
          } else if (otherTags1.tags.length) {
            return this.getTagMatch(
              study,
              study[otherTags1.type],
              otherTags1.tags
            );
          } else if (otherTags2.tags.length) {
            return this.getTagMatch(
              study,
              study[otherTags2.type],
              otherTags2.tags
            );
          } else {
            //return all studies if there is no tags
            return study;
          }

          if (categoryTags.length) {
            //check if there is any array tags added
            return this.getTagMatch(study, study.category, categoryTags);
          } else {
            //return all if there is nothing in the array
            return study;
          }*/
        // }

        // if (type === "school") {
        //   if (locationTags.length && categoryTags.length) {
        //     //if there are both location tags and category tags return those that match both array's tags
        //     let locationMatch = this.getTagMatch(
        //       study,
        //       study.location,
        //       locationTags
        //     ); //set study that matches current the location tags to the variable locationMatch
        //     if (locationMatch) {
        //       //check if there the current study is a match
        //       return this.getTagMatch(study, study.category, categoryTags);
        //     } else return null;
        //   } else if (locationTags.length) {
        //     return this.getTagMatch(study, study.location, locationTags);
        //   } else if (categoryTags.length) {
        //     return this.getTagMatch(study, study.category, categoryTags);
        //   } else {
        //     //return all studies if there is no tags
        //     return study;
        //   }
        // }

        // if (type === "name") {
        //   //check if the input field that is active is not location
        //   if (locationTags.length && categoryTags.length) {
        //     //if there are both location tags and category tags return those that match both array's tags
        //     let locationMatch = this.getTagMatch(
        //       study,
        //       study.location,
        //       locationTags
        //     ); //set study that matches current the location tags to the variable locationMatch
        //     if (locationMatch) {
        //       //check if there the current study is a match
        //       return this.getTagMatch(study, study.category, categoryTags);
        //     } else return null;
        //   } else if (locationTags.length) {
        //     return this.getTagMatch(study, study.location, locationTags);
        //   } else if (categoryTags.length) {
        //     return this.getTagMatch(study, study.category, categoryTags);
        //   } else {
        //     //return all studies if there is no tags
        //     return study;
        //   }
        // }
      }
      //return null if there is no inputs
      return null;
    });

    // let tempArray = [];
    // console.log(comparisonArray);
    // for (let i in comparisonArray) {
    //   let isMatch = false;
    //   for (let j in tagListArray) {
    //     for (let k in tagListArray[j].tags) {
    //       console.log(comparisonArray[i], "was in here", "k was", k);
    //       if (k > 0) {
    //         tempArray.push(comparisonArray[i]);
    //       }
    //       if (
    //         comparisonArray[i][tagListArray[j].type] ===
    //           tagListArray[j].tags[k] ||
    //         k > 0

    //         //TagListArray[j = 0].type er location. comparisonArray[i = 0][tagListArray[0].type] = Bodø === Bodø,
    //         //TagListArray[j = 1].type er school(k = 0). comparisonArray[i = 0][tagListArray[1].type] = Politihøgskolen === Politihøgskolen.
    //         //TagListArray[j = 1].type er school(k = 1). comparisonArray[i = 0][tagListArray[1].type] = Høgskolen i Bodø =x= Politihøgskolen.
    //         //isMatch blir false
    //         //Ingen push skjer
    //       ) {
    //         isMatch = true;
    //       } else {
    //         isMatch = false;
    //         break;
    //       }
    //     }
    //     if (!isMatch) break;
    //   }
    //   if (isMatch === true) {
    //     tempArray.push(comparisonArray[i]);
    //     console.log("noe", isMatch, "added to array", comparisonArray[i]);
    //   }
    // }

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
                <SearchTags
                  keyword={dropDown.name}
                  removeTag={this.removeTag}
                  array={dropDown.tags}
                />
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
        school: single.Laerestednavn,
        schoolCode: single.Laerestedkode
      };
    }),
    pageId: ownProps.pageId
  };
};

export default connect(mapStateToProps)(Search);
