import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import api from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const EditUserForm = () => {
    const [data, setData] = useState({
        email: "",
        name: "",
        profession: "",
        sex: "Male",
        qualities: [],
        licence: false
    });

    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState({});
    const [qualities, setQualities] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { userId } = useParams();
    const history = useHistory();

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setData((prevState) => ({
                ...prevState,
                name: data.name,
                email: "",
                profession: data.profession._id,
                sex: data.sex,
                qualities: data.qualities
            }));
            setIsLoading(true);
        });
    }, []);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: { message: "Email введен не корректно" }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        name: {
            isRequired: {
                message: "Это поле обязательно для заполнения"
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
        setData((prevState) => ({ ...prevState, [target.name]: target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) return;

        console.log(data);
        console.log(e);

        const prof = {
            _id: data.profession,
            name: Object.keys(professions)
                .map((prof) => professions[prof])
                .find((prof) => prof._id === data.profession).name
        };
        const qual = data.qualities.map((q) => ({
            id: q.value,
            name: q.label,
            color: Object.keys(qualities)
                .map((quality) => qualities[quality])
                .find((quality) => quality._id === q.value).color
        }));

        const newData = { ...data, profession: prof, qualities: qual };

        console.log(newData);

        api.users.update(userId, newData).then(() => goBack());
    };
    const goBack = () => {
        history.push(`/users/${userId}`);
    };

    if (isLoading) {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                value={data.email}
                                onChange={handleChange}
                                name="email"
                                error={errors.email}
                            />
                            <SelectField
                                onChange={handleChange}
                                options={professions}
                                // defaultOption="Choose..."
                                error={errors.profession}
                                value={data.profession}
                                label="Выберите вашу профессию"
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
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                                selected={data.qualities}
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-secondary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <p>Loading...</p>;
    }
};

export default EditUserForm;
