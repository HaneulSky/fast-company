import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserCard = ({ user, id }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <Link to={`/users/${id}/edit`}>
                    <button
                        className="
                                    position-absolute
                                    top-0
                                    end-0
                                    btn btn-light btn-sm
                                "
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                </Link>
                <div
                    className="d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative"
                >
                    <img
                        src={`https://avatars.dicebear.com/api/avataaars/${(
                            Math.random() + 1
                        )
                            .toString(36)
                            .substring(7)}.svg`}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="150"
                    />
                    <h2>{user.name}</h2>
                    <h3>Профессия: {user.profession.name}</h3>
                    <div className="text-muted">
                        <i
                            className="bi bi-caret-down-fill text-primary"
                            role="button"
                        ></i>
                        <i
                            className="bi bi-caret-up text-secondary"
                            role="button"
                        ></i>
                        <span className="ms-2">{user.rate}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    user: PropTypes.object,
    id: PropTypes.string
};

export default UserCard;
