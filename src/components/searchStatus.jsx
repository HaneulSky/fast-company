import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ onPhrase, length }) => {
    return (
        <h2>
            <span className={"badge bg-" + (length > 0 ? "primary" : "danger")}>
                {length > 0 ? `${length + " " + onPhrase(length)}   с тобой сегодня` : "Никто с тобой не тусанет"}
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    onPhrase: PropTypes.func.isRequired,
    length: PropTypes.number
};

export default SearchStatus;
