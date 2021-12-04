import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate.js";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import UserPage from "../../page/userPage";
import { useParams } from "react-router";
import SearchField from "../../common/form/searchField";
import { useUser } from "../../../hooks/useUsers.jsx";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [search, setSearch] = useState("");
    const { userId } = useParams();
    const { users } = useUser();
    console.log(users);

    const handleDelete = (userID) => {
        // return setUsers(
        //     users.filter(
        //         (user) => JSON.stringify(user._id) !== JSON.stringify(userID)
        //     )
        // );
        console.log(userID);
    };

    const toggleBookmark = (userId) => {
        const newArray = users.map((user) => {
            if (user._id === userId) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        //   setUsers(newArray)
        console.log(newArray);
    };

    const pageSize = 8;

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearch("");
    };

    const handleSearch = (e) => {
        setSelectedProf(undefined);
        setSearch(e.target.value);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (users) {
        const filteredUsers = search
            ? users.filter(
                  (user) =>
                      user.name.toLowerCase().indexOf(search.toLowerCase()) !==
                      -1
              )
            : selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users;

        const count = filteredUsers.length;

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const usersCrop = paginate(sortedUsers, currentPage, pageSize);

        const clearFilter = () => {
            setSelectedProf();
        };

        const renderPhrase = (num) => {
            const lastOne = Number(num.toString().slice(-1));
            if (num > 4 && num < 15) {
                return "человек тусанет";
            }
            if (lastOne === 1) return "человек тусанет";
            if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
            return "человек тусанет";
        };

        if (userId) {
            return <UserPage users={users} id={userId} />;
        }

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex0shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus onPhrase={renderPhrase} length={count} />
                    <SearchField onChange={handleSearch} value={search} />
                    {!!count && (
                        <UsersTable
                            users={usersCrop}
                            onDelete={handleDelete}
                            onBookmark={toggleBookmark}
                            onSort={handleSort}
                            selectedSort={sortBy}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
