import React from "react";
import PropTypes from "prop-types";
import UsersListPage from "../page/usersListPage";
import UserPage from "../page/userPage";
import { useParams } from "react-router";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return <>{userId ? <UserPage id={userId} /> : <UsersListPage />}</>;
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
