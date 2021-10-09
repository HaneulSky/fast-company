import React, { useEffect, useState } from "react";
import TextField from "../textField";
import { validator } from "../../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        email: {
            isRequired: { message: "Электронная почта обязательна для заполнения" },
            isEmail: { message: "Email введен не корректно" }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: { message: "Пароль должен содержать хотя бы одну заглавную букву" },
            isContainDigit: { message: "Пароль должен содержать хотя бы одну цифру" },
            min: { message: "Пароль должен быть не менее 8 символов", value: 8 }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (e) => {
        setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        console.log(data);
        console.log(e);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Электронная почта"
                            value={data.email}
                            onChange={handleChange}
                            name="email"
                            error={errors.email}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            error={errors.password}
                        />
                        <button type="submit" disabled={!isValid} className="btn btn-secondary w-100 mx-auto">Отправить</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
