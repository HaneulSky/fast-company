import React from "react";
import { useParams, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import EditUserPage from "../page/editUserPage";
import UserPage from "../page/userPage";
import UsersListPage from "../page/usersListPage";
import { getCurrentUserId } from "../../store/users";
import UsersLoader from "../ui/hoc/usersLoader";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {userId ? (
                    edit ? (
                        userId === currentUserId ? (
                            <EditUserPage />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersLoader>
        </>
    );
};

export default Users;
