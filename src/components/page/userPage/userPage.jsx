import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";
import { Link } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((user) => {
            setUser(user);
        });
    }, []);

    if (!user) return <h1>Loading...</h1>;

    return (
        <>
            <h2>{user.name}</h2>
            <h3>Профессия: {user.profession.name}</h3>
            <p>
                <QualitiesList qualities={user.qualities} />
            </p>
            <p>completedMeetings: {user.completedMeetings}</p>
            <p>Rate: {user.rate}</p>

            <Link to={`/users/${id}/edit`} className="btn btn-primary">
                изменить
            </Link>
        </>
    );
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
