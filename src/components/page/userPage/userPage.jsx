import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import QualitiesList from "../../ui/qualities/qualitiesList";
import { Link } from "react-router-dom";

const UserPage = ({ id }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(id).then((user) => {
            setUser(user);
        });
    }, []);

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
                            <div>
                                <h2>New comment</h2>
                                <div className="mb-4">
                                    <select
                                        className="form-select"
                                        name="userId"
                                        value=""
                                    >
                                        <option disabled value="" selected>
                                            Выберите пользователя
                                        </option>

                                        <option>Доктор</option>
                                        <option>Тусер</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="exampleFormControlTextarea1"
                                        className="form-label"
                                    >
                                        Сообщение
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="exampleFormControlTextarea1"
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3">
                        <div className="card-body">
                            <h2>Comments</h2>
                            <hr />
                            <div className="bg-light card-body mb-3">
                                <div className="row">
                                    <div className="col">
                                        <div className="d-flex flex-start">
                                            <img
                                                src="https://avatars.dicebear.com/api/avataaars/qweqasdas.svg"
                                                className="
                                                    rounded-circle
                                                    shadow-1-strong
                                                    me-3
                                                "
                                                alt="avatar"
                                                width="65"
                                                height="65"
                                            />
                                            <div
                                                className="
                                                    flex-grow-1 flex-shrink-1
                                                "
                                            >
                                                <div className="mb-4">
                                                    <div
                                                        className="
                                                            d-flex
                                                            justify-content-between
                                                            align-items-center
                                                        "
                                                    >
                                                        <p className="mb-1">
                                                            Джон Дориан
                                                            <span className="small">
                                                                5 минут назад
                                                            </span>
                                                        </p>
                                                        <button
                                                            className="
                                                                btn btn-sm
                                                                text-primary
                                                                d-flex
                                                                align-items-center
                                                            "
                                                        >
                                                            <i
                                                                className="
                                                                    bi bi-x-lg
                                                                "
                                                            ></i>
                                                        </button>
                                                    </div>
                                                    <p className="small mb-0">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur
                                                        adipisicing elit.
                                                        Corporis, soluta facilis
                                                        fugit hic quasi sapiente
                                                        accusamus quia
                                                        voluptatem dolorum
                                                        laboriosam id iste
                                                        voluptas modi animi eius
                                                        voluptatum adipisci amet
                                                        officiis.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserPage.propTypes = {
    id: PropTypes.string
};

export default UserPage;
