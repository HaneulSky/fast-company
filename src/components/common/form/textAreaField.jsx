import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, error, onChange, name }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    return (
        <div className="mb-4">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
                {label}
            </label>
            <textarea
                onChange={handleChange}
                className={getInputClasses()}
                name={name}
                rows="3"
            >
                {}
            </textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string
};

export default TextAreaField;
