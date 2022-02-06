import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const UserCard = ({ user }) => {
    const history = useHistory();
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    const currentUser = useSelector(getCurrentUserData());
    console.log(currentUser);
    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUser._id === user._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleClick}
                    >
                        <i className="bi bi-gear"></i>
                    </button>
                )}

                <div
                    className="d-flex
                                    flex-column
                                    align-items-center
                                    text-center
                                    position-relative"
                >
                    <img
                        src={user.image}
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
