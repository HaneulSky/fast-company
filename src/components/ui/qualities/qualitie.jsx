import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQuality";

const Qualitie = ({ qualityId }) => {
    const { getQuality } = useQualities();
    const { _id, color, name } = getQuality(qualityId);
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
    qualityId: PropTypes.string
};

export default Qualitie;
