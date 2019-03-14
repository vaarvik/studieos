import React, { Component } from "react";
import SeachResults from "../search/filters/SeachResults";
import SearchDropDown from "../search/filters/SearchDropDown";
import SearchTags from "../search/SearchTags";
import SearchCheckbox from "./filters/SearchCheckbox";

class SearchFilter extends Component {
  components = {
    results: SeachResults,
    dropdown: SearchDropDown,
    checkbox: SearchCheckbox,
    tags: SearchTags
  };
  render() {
    const TagName = this.components[this.props.tag];
    const tags =
      this.props.tag === "dropdown" ? (
        <SearchTags
          keyword={this.props.keyword}
          removeTag={this.props.removeTag}
          array={this.props.array}
        />
      ) : null;
    return (
      <React.Fragment>
        <TagName
          searchStudies={this.props.searchStudies}
          keyword={this.props.keyword}
          addTag={this.props.addTag}
          resetStatus={this.props.resetStatus}
          toggleSearch={this.props.toggleSearch}
          placeholder={this.props.placeholder}
          operating={this.props.operating}
          removeTag={this.props.removeTag}
          array={this.props.array}
          topic={this.props.topic}
          rawArray={this.props.rawArray}
        />
        {tags}
      </React.Fragment>
    );
  }
}
export default SearchFilter;
