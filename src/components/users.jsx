import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  console.log(users.length);

  const handleDelete = (userID) => {
    return setUsers(users.filter((user) => user._id !== userID));
  };

  const renderPhrase = (num) => {
    if (
      num > 0 &&
      1 < num < 5 &&
      num !== 1 &&
      num !== 5 &&
      num !== 6 &&
      num !== 7 &&
      num !== 8 &&
      num !== 9 &&
      num !== 10 &&
      num !== 11 &&
      num !== 12 &&
      num !== 13 &&
      num !== 14
    ) {
      return `${users.length} человека тусанут с тобой сегодня`;
    } else if (users.length === 0) {
      return "Никто не тусанет с тобой сегодня";
    } else return `${users.length} человек тусанет с тобой сегодня`;
  };

  const getBageClasses = () => {
    let clasess = "badge m-2 bg-";
    clasess += !!users.length ? "primary" : "danger";
    return clasess;
  };

  return (
    <React.Fragment>
      <span className={getBageClasses()}>{renderPhrase(users.length)}</span>

      {!!users.length && (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td key={user._id}>{user.name}</td>
                <td key={user._id}>
                  {user.qualities.map((quality) => (
                    <span
                      key={quality._id}
                      className={`badge me-2 bg-${quality.color}`}
                      style={{ color: "white" }}
                    >
                      {quality.name}
                    </span>
                  ))}
                </td>
                <td key={user._id}>{user.profession.name}</td>
                <td key={user._id}>{user.completedMeetings}</td>
                <td key={user._id}>{user.rate}</td>
                <td>
                  <button
                    class="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </React.Fragment>
  );
};

export default Users;
