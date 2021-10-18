import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";
import { Link } from "react-router-dom";
import { validator } from "../../../utils/validator";
import CommentList from "../../common/comments/commentList";
import AddCommentForm from "../../ui/addCommentForm";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [comments, setComments] = useState();
    const [newComment, setNewComment] = useState({
        name: "",
        message: ""
    });

    const getComments = () => {
        api.comments.fetchCommentsForUser(id).then((data) => setComments(data));
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
        api.users.getById(id).then((user) => {
            setUser(user);
        });
        getComments();
    }, []);

    const validatorConfig = {
        name: {
            isRequired: {
                message: "Обязательно выберите пользователя"
            }
        },
        message: {
            isRequired: {
                message: "Это поле не должно быть пустым"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [users]);

    const validate = () => {
        const errors = validator(newComment, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;
    const handleChange = (target) => {
        setNewComment((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleDelete = (id) => {
        api.comments.remove(id).then(getComments);
    };

    const addComment = () => {
        api.comments.add();
    };

    if (!user) return <h1>Loading...</h1>;

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-4">
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
                    <div className="card mb-3">
                        <div
                            className="
                                card-body
                                d-flex
                                flex-column
                                justify-content-center
                                text-center
                            "
                        >
                            <h5 className="card-title">
                                <span>Qualities</span>
                            </h5>
                            <p>
                                <QualitiesList qualities={user.qualities} />
                            </p>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card mb-3">
                            <div
                                className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                            >
                                <h5 className="card-title">
                                    <span>Completed meetings</span>
                                </h5>
                                <h1 className="display-1">
                                    {user.completedMeetings}
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card mb-2">
                        <div className="card-body">
                            <AddCommentForm
                                isValid={isValid}
                                onChange={handleChange}
                                users={users}
                                errors={errors}
                            />
                        </div>
                    </div>

                    {!!comments.length && (
                        <CommentList
                            onDelete={handleDelete}
                            comments={comments}
                            users={users}
                            id={id}
                            onSubmit={addComment}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
