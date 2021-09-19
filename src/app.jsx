import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    console.log(users.length);

    const handleDelete = (userID) => {
        return setUsers(users.filter((user) => user._id !== userID));
    };

    const renderPhrase = (num) => {
        if (num > 1 && num < 5) {
            return `${users.length} человека тусанут с тобой сегодня`;
        } else if (users.length === 0) {
            return "Никто не тусанет с тобой сегодня";
        } else return `${users.length} человек тусанет с тобой сегодня`;
    };

    const toggleBookmark = (userId) => {
        setUsers(
            users.filter((user) => {
                if (user._id === userId) {
                    user.status = !user.status;
                    return user;
                }
                return user;
            })
        );
    };

    return (
        <>
            <SearchStatus onPhrase={renderPhrase} />
            <Users
                users={users}
                onDelete={handleDelete}
                onBookmark={toggleBookmark}
            />
        </>
    );
};

export default App;
