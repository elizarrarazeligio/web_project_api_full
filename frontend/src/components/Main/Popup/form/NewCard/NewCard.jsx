import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";
import { useContext, useRef } from "react";

export default function NewCard() {
  const { handleAddCardSubmit } = useContext(CurrentUserContext);

  const placeRef = useRef();
  const linkRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddCardSubmit({
      name: placeRef.current.value,
      link: linkRef.current.value,
    });
  };

  return (
    <form className="form popup__form" noValidate onSubmit={handleSubmit}>
      <fieldset className="form__format">
        <input
          id="place-input"
          className="form__input form__input_type_place"
          type="text"
          name="name"
          placeholder="Lugar"
          minLength="2"
          maxLength="30"
          required
          ref={placeRef}
        />
        <span className="form__input-error place-input-error"></span>
        <input
          id="image-input"
          className="form__input form__input_type_link"
          type="url"
          name="link"
          placeholder="URL de imagen"
          required
          ref={linkRef}
        />
        <span className="form__input-error image-input-error"></span>
      </fieldset>
      <button className="form__button" type="submit">
        Guardar
      </button>
    </form>
  );
}
