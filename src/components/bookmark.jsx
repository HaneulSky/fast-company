import React from "react";
const Bookmark = ({ status }) => {
  return <i className={`bi bi-bookmark${status === true ? "-fill" : ""}`}></i>;
};

export default Bookmark;
