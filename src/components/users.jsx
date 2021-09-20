import React, { useState } from "react";
import User from "./user";
import { paginate } from "../utils/paginate.js";
import Pagination from "./pagination";
import PropTypes from "prop-types";

const Users = ({ users: allUsers, ...rest }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const lengthUsers = allUsers.length;
    const pageSize = 4;
    const handlePageChange = (pageIndex) => {
        console.log("page:", pageIndex);
        setCurrentPage(pageIndex);
    };
    const users = paginate(allUsers, currentPage, pageSize);

    return (
        <React.Fragment>
            {!!lengthUsers && (
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
            <Pagination
                itemsCount={lengthUsers}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                currentPage={currentPage}
            />
        </React.Fragment>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired
};

export default Users;
