import React from "react";
import PropTypes from "prop-types";
const Bookmark = ({ status }) => {
  return <i className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}></i>;
};
Bookmark.propTypes = {
  status: PropTypes.bool
};

export default Bookmark;
