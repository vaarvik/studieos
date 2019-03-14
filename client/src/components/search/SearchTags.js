import React from "react";

const SearchTags = props => {
  const { keyword, removeTag, array } = props;

  return (
    <ul id={`${keyword}-tags"`}>
      {array.map((key, i) => {
        return (
          <li
            key={key + i}
            value={key}
            onClick={e => {
              removeTag(e, keyword);
            }}
            className="searchTag"
          >
            {key}
          </li>
        );
      })}
    </ul>
  );
};

export default SearchTags;
