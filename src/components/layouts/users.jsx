import React from "react";
import PropTypes from "prop-types";
import UsersListPage from "../page/usersListPage";
import UserPage from "../page/userPage";
import { useParams } from "react-router";
import UserProvider from "../../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return (
        <UserProvider>
            {userId ? <UserPage id={userId} /> : <UsersListPage />}
        </UserProvider>
    );
};

Users.propTypes = {
    users: PropTypes.array
};

export default Users;
