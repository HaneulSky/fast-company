import React from "react";
import PropTypes from "prop-types";
const Bookmark = ({ status }) => {
    return (
        <i className={`bi bi-bookmark${status === true ? "-fill" : ""}`}></i>
    );
};
Bookmark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default Bookmark;
