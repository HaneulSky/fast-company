import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ _id, color, name }) => {
    return (
        <span
            key={_id}
            className={`badge me-2 bg-${color}`}
            style={{ color: "white" }}
        >
            {name}
        </span>
    );
};

Qualitie.propTypes = {
    _id: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};

export default Qualitie;
