import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import CommentList from "../../common/comments/commentList";
import AddCommentForm from "../../ui/addCommentForm";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import CompletedMeetingsCard from "../../ui/completedMeetingsCard";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState({});
    const [comments, setComments] = useState();
    const [newCommentData, setNewCommentData] = useState({
        userName: "",
        userMessage: ""
    });

    const getComments = () => {
        api.comments.fetchCommentsForUser(id).then((data) => setComments(data));
    };

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setUsers(data);
        });
        api.users.getById(id).then((data) => {
            setUser(data);
        });
        getComments();
    }, []);

    const validatorConfig = {
        userName: {
            isRequired: {
                message: "Обязательно выберите пользователя"
            }
        },
        userMessage: {
            isRequired: {
                message: "Это поле не должно быть пустым"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [newCommentData]);

    const handleChange = (target) => {
        setNewCommentData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleDelete = (id) => {
        api.comments.remove(id).then(getComments);
    };
    const validate = () => {
        const errors = validator(newCommentData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComment = {
            pageId: id,
            userId: users.find((user) => user.name === newCommentData.userName)
                ._id,
            content: newCommentData.userMessage
        };
        api.comments.add(newComment).then(getComments);

        setNewCommentData((prevState) => ({
            ...prevState,
            userName: "",
            userMessage: ""
        }));

        console.log(comments);
    };

    if (!user) return <h1>Loading...</h1>;

    return (
        <div className="container">
            <div className="row gutters-sm">
                <div className="col-md-4 mb-4">
                    <div className="card mb-3">
                        <UserCard user={user} id={id} />
                    </div>
                    <QualitiesCard user={user} />
                    <CompletedMeetingsCard user={user} />
                </div>
                <div className="col-md-8">
                    <div className="card mb-2">
                        <div className="card-body">
                            <AddCommentForm
                                isValid={isValid}
                                onChange={handleChange}
                                users={users}
                                errors={errors}
                                onSubmit={handleSubmit}
                                data={newCommentData}
                            />
                        </div>
                    </div>

                    {!!comments.length && (
                        <CommentList
                            onDelete={handleDelete}
                            comments={comments}
                            users={users}
                            id={id}
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
