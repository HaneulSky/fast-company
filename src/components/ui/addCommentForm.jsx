import React from "react";
import SelectField from "../common/form/selectField";
import PropTypes from "prop-types";

const AddCommentForm = ({ isValid, onChange, users, errors }) => {
    return (
        <div>
            <h2>New comment</h2>
            <div className="mb-4">
                <SelectField
                    onChange={onChange}
                    options={users}
                    defaultOption="Выберите пользователя"
                    error={errors.users}
                    label="Выберите пользователя"
                />
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
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary"
            >
                Опубликовать
            </button>
        </div>
    );
};

AddCommentForm.propTypes = {
    isValid: PropTypes.bool,
    onChange: PropTypes.func,
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    errors: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default AddCommentForm;
