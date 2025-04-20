import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <form className="form popup__form" noValidate onSubmit={handleSubmit}>
      <fieldset className="form__format">
        <input
          id="name-input"
          className="form__input form__input_type_name"
          type="text"
          name="name"
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span className="form__input-error name-input-error"></span>
        <input
          id="about-input"
          className="form__input form__input_type_job"
          type="text"
          name="about"
          placeholder="Acerca de mí"
          minLength="2"
          maxLength="200"
          required
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="form__input-error about-input-error"></span>
      </fieldset>
      <button className="form__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
