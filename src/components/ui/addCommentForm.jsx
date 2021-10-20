import React from "react";
import SelectField from "../common/form/selectField";
import PropTypes from "prop-types";
import TextAreaField from "../common/form/textAreaField";

const AddCommentForm = ({
    isValid,
    onChange,
    users,
    errors,
    onSubmit,
    data
}) => {
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <SelectField
                        defaultOption="Выберите пользователя"
                        onChange={onChange}
                        options={users}
                        error={errors.userName}
                        value={data.userName}
                        name="userName"
                        label="Выберите пользователя"
                    />
                </div>
                <TextAreaField
                    label="Сообщение"
                    onChange={onChange}
                    error={errors.userMessage}
                    value={data.userMessage}
                    name="userMessage"
                />
                <button
                    type="submit"
                    disabled={!isValid}
                    className="btn btn-primary"
                    onSubmit={() => onSubmit()}
                >
                    Опубликовать
                </button>
            </form>
        </div>
    );
};

AddCommentForm.propTypes = {
    isValid: PropTypes.bool,
    onChange: PropTypes.func,
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    errors: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    onSubmit: PropTypes.func,
    data: PropTypes.object
};

export default AddCommentForm;
