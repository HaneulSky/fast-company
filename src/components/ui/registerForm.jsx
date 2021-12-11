import React, { useEffect, useState } from "react";

import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQuality";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "Male",
        qualities: [],
        licence: false
    });
    const { signUp } = useAuth();
    const [errors, setErrors] = useState({});
    const { qualities } = useQualities();
    const { professions } = useProfession();
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Email введен не корректно" }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одну цифру"
            },
            min: { message: "Пароль должен быть не менее 8 символов", value: 8 }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        licence: {
            isRequired: {
                message:
                    "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
            }
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

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        const newData = {
            ...data,
            qualities: data.qualities.map((q) => q.value)
        };

        try {
            await signUp(newData);
            history.push("/");
        } catch (error) {
            setErrors(error);
        }
    };

    return (
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
            <SelectField
                onChange={handleChange}
                options={professionsList}
                defaultOption="Choose..."
                error={errors.profession}
                value={data.profession}
                label="Выберите вашу профессию"
                name="profession"
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Выберите ваш пол "
            />
            <MultiSelectField
                options={qualitiesList}
                onChange={handleChange}
                name="qualities"
                label="Выберите ваши качества"
            />
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>

            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-secondary w-100 mx-auto"
            >
                Отправить
            </button>
        </form>
    );
};

export default RegisterForm;
