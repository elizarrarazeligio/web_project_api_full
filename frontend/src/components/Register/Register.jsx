import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { configParameters, FormValidator } from "../../utils/FormValidator";

export default function Register({ handleRegister }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const formRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formValidation = new FormValidator(configParameters, formRef.current);
    formValidation.enableValidation();
    handleRegister(data);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Regístrate</h2>
      <form
        className="form auth__form"
        noValidate
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <fieldset className="form__format">
          <input
            id="email-input"
            type="email"
            className="form__input auth__input"
            name="email"
            minLength="2"
            maxLength="30"
            value={data.email}
            placeholder="Correo electrónico"
            required
            onChange={handleChange}
          />
          <span className="form__input-error email-input-error"></span>
          <input
            id="password-input"
            type="password"
            minLength="2"
            maxLength="30"
            className="form__input auth__input"
            name="password"
            value={data.password}
            placeholder="Contraseña"
            required
            onChange={handleChange}
          />
          <span className="form__input-error password-input-error"></span>
        </fieldset>
        <button className="form__button auth__button" type="submit">
          Regístrate
        </button>
      </form>
      <span className="auth__text">
        ¿Ya eres miembro? Inicia sesión{" "}
        <Link to="/signin" className="auth__link">
          aquí
        </Link>
      </span>
    </section>
  );
}
