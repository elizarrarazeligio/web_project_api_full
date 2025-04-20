import { useContext, useRef } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  // Uso de referencia para obtener valor de input de avatar
  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateAvatar(avatarRef.current.value);
  };

  return (
    <form className="form popup__form" noValidate onSubmit={handleSubmit}>
      <fieldset className="form__format">
        <input
          id="user-input"
          className="form__input form__input_type_user"
          type="url"
          name="user"
          placeholder="URL de foto de perfil"
          required
          ref={avatarRef}
        />
        <span className="form__input-error user-input-error"></span>
      </fieldset>
      <button className="form__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
