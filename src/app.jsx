import React, { useState, useEffect } from "react";
import Users from "./components/users";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    const handleDelete = (userID) => {
        return setUsers(users.filter((user) => user._id !== userID));
    };

    const toggleBookmark = (userId) => {
        setUsers(
            users.map((user) => {
                if (user._id === userId) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    return (
        <>
            <Users
                users={users}
                onDelete={handleDelete}
                onBookmark={toggleBookmark}
            />
        </>
    );
};

export default App;
