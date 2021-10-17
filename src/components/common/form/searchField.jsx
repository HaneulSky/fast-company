import React from "react";
import PropTypes from "prop-types";

const SearchField = ({ onChange, value }) => {
    return (
        <div className="input-group">
            <input
                type="search"
                className="form-control ds-input"
                value={value}
                name="search-input"
                placeholder="Search..."
                onChange={onChange}
            />
        </div>
    );
};

SearchField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default SearchField;
