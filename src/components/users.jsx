import React from "react";
import User from "./user";

const Users = ({ users, lengthUsers, ...rest }) => {
  console.log(users);
  return (
    <React.Fragment>
      {!!users.length && (
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
    </React.Fragment>
  );
};

export default Users;
