import React, { useState, useEffect } from "react";
import { paginate } from "../../utils/paginate.js";
import Pagination from "../pagination";
import PropTypes from "prop-types";
import GroupList from "../groupList";
import api from "../../api";
import SearchStatus from "../searchStatus";
import UsersTable from "../usersTable";
import _ from "lodash";
import User from "../user.jsx";
import { useParams } from "react-router";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfesions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
  const [users, setUsers] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleDelete = (userID) => {
    return setUsers(users.filter((user) => JSON.stringify(user._id) !== JSON.stringify(userID)));
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

  const pageSize = 8;

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfesions(data));
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = selectedProf ? users.filter((user) => user.profession._id === selectedProf._id) : users;

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

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
      return <User users={users} id={userId} />;
    }

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex0shrink-0 p-3">
            <GroupList selectedItem={selectedProf} items={professions} onItemSelect={handleProfessionSelect} />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus onPhrase={renderPhrase} length={count} />
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

Users.propTypes = {
  users: PropTypes.array
};

export default Users;
