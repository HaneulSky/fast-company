import React, { useState, useEffect } from "react";
import User from "./user";
import { paginate } from "../utils/paginate.js";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

const Users = ({ users: allUsers, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfesions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  const pageSize = 4;

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

  const filteredUsers = selectedProf ? allUsers.filter((user) => user.profession._id === selectedProf._id) : allUsers;

  const count = filteredUsers.length;

  const users = paginate(filteredUsers, currentPage, pageSize);

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
          <table className="table">
            <thead>
              <tr>
                <th key="1" scope="col">
                  Имя
                </th>
                <th key="2" scope="col">
                  Качества
                </th>
                <th key="3" scope="col">
                  Профессия
                </th>
                <th key="4" scope="col">
                  Встретился, раз
                </th>
                <th key="5" scope="col">
                  Оценка
                </th>
                <th key="6" scope="col"></th>
                <th key="7" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <User key={user._id} {...user} {...rest} />
              ))}
            </tbody>
          </table>
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
};

Users.propTypes = {
  users: PropTypes.object,
  allUsers: PropTypes.object
};

export default Users;
