import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    dropDownName: false,
    dropDownLocation: false,
    dropDownCategory: false,
    regMes: null,
    locationTags: [],
    categoryTags: [],
    searchStudies: []
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
    const tagName = type + "Tags";
    let tags = this.state[tagName];
    const tagExists = tags.find(tag => {
      if (tag === e.target.innerText) return true;
    });
    if (tagExists) return null;
    tags.push(e.target.innerText);
    this.setState({
      [tagName]: tags
    });
  };

  removeTag = (e, type) => {
    const tagName = type + "Tags";
    let tags = this.state[tagName];
    this.setState({
      [tagName]: tags.filter(tag => tag != e.target.innerText)
    });
  };

  resetOtherDropdowns = type => {
    const typeState = "dropDown" + type.toString();
    this.setState({
      //reset state
      dropDownName: false,
      dropDownLocation: false,
      dropDownCategory: false,
      [typeState]: true
    });

    // const typeRef = type.toString().toLowerCase() + "Search";
    // Object.keys(this.refs).forEach(ref => {
    //   //set other dropdowns' value to ""
    //   if (ref !== this.refs[typeRef]) this.refs[ref].value = "";
    // });
  };

  validateInput = (e, type) => {
    let reg = /^( |\(|\)|,|-|[a-å])+$/gi;
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
    } else {
      this.setState({
        [focus]: false
      });
      this.displayRegMessage(false);
    }
  };

  sortArray = (array, type) => {
    const typeProp = type.toString().toLowerCase();
    //sort array in alphabetical order after type
    array.sort(function(a, b) {
      if (a[typeProp] < b[typeProp]) return -1;
      if (a[typeProp] > b[typeProp]) return 1;
      return null;
    });
  };

  toggleSearch = (e, type) => {
    this.validateInput(e, type); //validate with regex
    this.resetOtherDropdowns(type); //only show one dropdown menu at the time
    const typeProp = type.toString().toLowerCase();
    let searchMatches = this.props.studies;
    let lcTerm = e.target.value.toLowerCase();

    searchMatches = searchMatches.filter(study => {
      let lcStudyProp = study[typeProp].toLowerCase(); //set the study property to lowercase

      if (lcStudyProp.indexOf(lcTerm) !== -1) {
        //check if the input value contain letters in the same order as a the study property
        if (type !== "Location") {
          //check if the input field that is active is not location
          if (this.state.locationTags.length) {
            //check if there is any location tags added
            for (let i in this.state.locationTags) {
              //loop through the location tags
              if (study.location === this.state.locationTags[i]) {
                //check if the current study location is equal to the location tag
                return study;
              }
            }
          } else return study;
        } else if (type !== "Category") {
          if (this.state.categoryTags.length) {
            //check if there is any category tags added
            for (let i in this.state.categoryTags) {
              //loop through the category tags
              if (study.category === this.state.categoryTags[i]) {
                //check if the current study category is equal to the location tag
                return study;
              }
            }
          } else return study;
        }
        //return all studies if there is no location tags
        else if (type === "Location") {
          //check if the input field that is active IS location..
          return study; //if so -> return all locations
        }
      }
    });
    //map through all studies
    // searchMatches = this.props.studies.filter((study, i) => {
    //   let locationMatches = [];
    //   for (let i = 0; i < this.state.locationTags.length; i++) {
    //     if (study.location === this.state.locationTags[i])
    //       locationMatches.push(study);
    //     searchMatches = locationMatches;
    //     console.log(searchMatches);
    //     // }
    //   }
    //   // if (
    //   //&&
    //   // study.category
    //   //   .toLowerCase()
    //   //   .indexOf(this.refs.categorySearch.value.toLowerCase()) !== -1 &&
    //   // study.location
    //   //   .toLowerCase()
    //   //   .indexOf(this.state.locationTags[0].toLowerCase()) !== -1
    //   // ) {
    //   return (
    //     lcStudyProp.indexOf(lcTerm) !== -1 &&
    //     study === this.props.studies[i] &&
    //     study.category
    //       .toLowerCase()
    //       .indexOf(this.refs.categorySearch.value.toLowerCase()) !== -1
    //     //   this.refs.categorySearch.value.toLowerCase() //&&
    //     // study.location === this.state.locationTags
    //   );

    //searchMatches.push(study);
    // if (

    // ) {
    //   console.log(searchMatches);
    // }
    //if the study name contains the term letters in the same order push the study in the array
    // }
    // });
    // console.log("as", searchMatches);
    this.sortArray(searchMatches, type);
    this.setState({ searchStudies: searchMatches });
  };

  componentDidUpdate = () => {
    // const { studies } = this.props;
    // studies.forEach((study, index) => {
    //   for (let i in studies)
    //     if (
    //       studies[i].name.toLowerCase() === study.name.toLowerCase() &&
    //       parseInt(i) !== index
    //     ) {
    //       study.name += " (" + study.school + ")";
    //       studies[i].name += " (" + studies[i].school + ")";
    //       break;
    //     }
    // study.name += " (" + study.school + ")";
    // });
  };

  render() {
    const dropDownName = this.state.dropDownName ? (
      <ul className="study-dropdown dropdown">
        {this.state.searchStudies.map((study, index) => {
          return (
            <Link to={`/studies/${study.id}`} key={study.id}>
              <li
                onClick={e => {
                  this.refs.nameSearch.value = "";
                  this.setState({
                    dropDownName: false
                  });
                }}
              >
                {study.name} ({study.schoolCode})
              </li>
            </Link>
          );
        })}
      </ul>
    ) : null;

    let locations = [];
    const dropDownLocation = this.state.dropDownLocation ? (
      <ul className="study-location-dropdown dropdown">
        {this.state.searchStudies.map(study => {
          for (let i in locations) {
            if (locations[i].location === study.location) return null;
          }
          locations.push(study);
          return (
            <li
              key={study.id}
              onClick={e => {
                this.addTag(e, "location");
                this.refs.locationSearch.value = "";
                this.setState({
                  dropDownLocation: false
                });
              }}
            >
              {study.location}
            </li>
          );
        })}
      </ul>
    ) : null;

    const selectedLocations = this.state.locationTags.length ? (
      <ul id="location-tags">
        {this.state.locationTags.map(location => {
          return (
            <li
              onClick={e => {
                this.removeTag(e, "location");
              }}
              class="searchTag"
            >
              {location}
            </li>
          );
        })}
      </ul>
    ) : null;

    let categories = [];
    const dropDownCategory = this.state.dropDownCategory ? (
      <ul className="study-category-dropdown dropdown">
        {this.state.searchStudies.map(study => {
          for (let i in categories) {
            if (categories[i].category === study.category) return null;
          }
          categories.push(study);
          return (
            <li
              key={study.id}
              onClick={e => {
                this.addTag(e, "category");
                this.refs.categorySearch.value = "";
                this.setState({
                  dropDownCategory: false
                });
              }}
            >
              {study.category}
            </li>
          );
        })}
      </ul>
    ) : null;

    const selectedCategories = this.state.categoryTags.length ? (
      <ul id="category-tags">
        {this.state.categoryTags.map(category => {
          return (
            <li
              onClick={e => {
                this.removeTag(e, "category");
              }}
              class="searchTag"
            >
              {category}
            </li>
          );
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
            type="text"
            autocomplete="off"
            id="name-search"
            ref="nameSearch"
            placeholder="Søk etter studie"
            onKeyUp={e => {
              this.toggleSearch(e, "Name");
            }}
            onClick={e => {
              this.toggleSearch(e, "Name");
            }}
          />
          {this.state.regMes}
          {dropDownName}
          <input
            id="location-search"
            ref="locationSearch"
            placeholder="Studiested"
            onKeyUp={e => {
              this.toggleSearch(e, "Location");
            }}
            onClick={e => {
              this.toggleSearch(e, "Location");
            }}
          />
          {selectedLocations}
          {dropDownLocation}
          <input
            id="category-search"
            ref="categorySearch"
            placeholder="Tema"
            onKeyUp={e => {
              this.toggleSearch(e, "Category");
            }}
            onClick={e => {
              this.toggleSearch(e, "Category");
            }}
          />
          {selectedCategories}
          {dropDownCategory}
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
