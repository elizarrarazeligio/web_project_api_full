import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ handleRegister }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(data);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Regístrate</h2>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <fieldset className="form__format">
          <input
            id="email-input"
            type="email"
            className="form__input auth__input"
            name="email"
            value={data.email}
            placeholder="Correo electrónico"
            required
            onChange={handleChange}
          />
          <span className="form__input-error place-input-error"></span>
          <input
            id="password-input"
            type="password"
            className="form__input auth__input"
            name="password"
            value={data.password}
            placeholder="Contraseña"
            required
            onChange={handleChange}
          />
          <span className="form__input-error place-input-error"></span>
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
