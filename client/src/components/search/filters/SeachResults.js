import React from "react";
import { Link } from "react-router-dom";

const SeachResults = props => {
  let refTarget = null;

  const {
    searchStudies,
    keyword,
    resetStatus,
    toggleSearch,
    placeholder,
    operating
  } = props;

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
            return (
              <Link to={`/studies/${study.id}`} key={study.id}>
                <li
                  onClick={e => {
                    refTarget.value = "";
                    resetStatus(keyword);
                  }}
                >
                  {study.name} ({study.schoolCode})
                </li>
              </Link>
            );
          })}
        </ul>
      ) : null}
    </React.Fragment>
  );
};

export default SeachResults;
