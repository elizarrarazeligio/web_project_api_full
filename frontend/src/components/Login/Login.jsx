import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { configParameters, FormValidator } from "../../utils/FormValidator";

export default function Login({ handleLogin }) {
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
    handleLogin(data);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Inicia sesión</h2>
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
            className="form__input auth__input"
            name="password"
            minLength="2"
            maxLength="30"
            value={data.password}
            placeholder="Contraseña"
            required
            onChange={handleChange}
          />
          <span className="form__input-error password-input-error"></span>
        </fieldset>
        <button className="form__button auth__button" type="submit">
          Inicia sesión
        </button>
      </form>
      <span className="auth__text">
        ¿Aún no eres miembro? Regístrate{" "}
        <Link to="/signup" className="auth__link">
          aquí
        </Link>
      </span>
    </section>
  );
}
