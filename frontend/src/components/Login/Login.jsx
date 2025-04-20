import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ handleLogin }) {
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
    handleLogin(data);
  };

  return (
    <section className="auth">
      <h2 className="auth__title">Inicia sesión</h2>
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
