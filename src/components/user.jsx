import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualitiesList from "./qualitiesList";
import { Link } from "react-router-dom";
// { name, professions, quality, completedMeetengs, rate }

const User = ({ id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((user) => {
            setUser(user);
        });
    }, []);
    console.log(user);

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
            <Link to="/users">
                <button>Все пользователи</button>
            </Link>
        </>
    );
};

User.propTypes = {
    id: PropTypes.string
};

export default User;
