import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  console.log(users);

  return (
    <React.Fragment>
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
          <tr>
            {users.map((user) => (
              <tr>
                <td key={user._id}>{user.name}</td>
                <td key={user._id}>
                  {user.qualities.map((quality) => quality.name)}
                </td>
                <td key={user._id}>{user.profession.name}</td>
                <td key={user._id}>{user.completedMeetings}</td>
                <td key={user._id}>{user.rate}</td>
              </tr>
            ))}
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Users;
