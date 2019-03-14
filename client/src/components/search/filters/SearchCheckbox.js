import React from "react";

const SearchCheckbox = props => {
  let refTarget = null;

  const { keyword, addTag, removeTag } = props;

  let studies = []; //create an empty array

  return (
    <React.Fragment>
      {props.rawArray.map(study => {
        //-------------------pevent duplicated values in the array------------------
        for (let i in studies) {
          if (studies[i][keyword] === study[keyword]) return null;
        }
        studies.push(study);
        return (
          <React.Fragment>
            <input
              type="checkbox"
              name={`${study[keyword]}`}
              id={`${keyword}-search-${study[keyword]}`}
              value={study.degree}
              ref={ref => {
                refTarget = ref;
              }}
              onClick={e => {
                console.log(e.target.checked);
                if (!e.target.checked) removeTag(e, keyword);
                else addTag(e, keyword);
              }}
              style={{ display: "inline-block", width: "10%" }}
            />
            Antall semester: {study.degree}
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

export default SearchCheckbox;
