import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQuality";

const QualitiesList = ({ qualitiesId }) => {
    const { isLoading } = useQualities();
    if (isLoading) return "Loading ...";
    return (
        <>
            {qualitiesId.map((quality) => (
                <Qualitie key={quality._id} {...quality} qualityId={quality} />
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualitiesId: PropTypes.array.isRequired
};

export default QualitiesList;
