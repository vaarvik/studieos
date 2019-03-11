import React from "react";

const SearchDropDown = props => {
  let refTarget = null;

  const {
    searchStudies,
    keyword,
    addTag,
    resetStatus,
    toggleSearch,
    placeholder,
    operating
  } = props;

  let studies = []; //create an empty array
  return (
    <React.Fragment>
      <input
        id={`${keyword}-search`}
        ref={ref => {
          refTarget = ref;
        }}
        placeholder={placeholder}
        onKeyUp={e => {
          toggleSearch(e, keyword);
        }}
        onClick={e => {
          toggleSearch(e, keyword);
        }}
      />
      {operating ? (
        <ul className="dropdown" id={`study-${keyword}-dropdown`}>
          {searchStudies.map(study => {
            //-------------------pevent duplicated values in the array------------------
            for (let i in studies) {
              if (studies[i][keyword] === study[keyword]) return null;
            }
            studies.push(study);
            //--------------------------------------------------------------------------

            return (
              <li
                key={study.id}
                onClick={e => {
                  addTag(e, keyword);
                  refTarget.value = "";
                  resetStatus(keyword);
                }}
              >
                {study[keyword]}
              </li>
            );
          })}
        </ul>
      ) : null}
    </React.Fragment>
  );
};

export default SearchDropDown;
