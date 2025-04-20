import editIcon from "../../assets/images/edit_icon.svg";
import plusButton from "../../assets/images/boton_mas.svg";
import NewCard from "./Popup/form/NewCard/NewCard";
import EditProfile from "./Popup/form/EditProfile/EditProfile";
import EditAvatar from "./Popup/form/EditAvatar/EditAvatar";
import Card from "../Card/Card";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main(props) {
  const { cards, onOpenPopup, onCardLike, onCardDelete } = props;
  const { currentUser } = useContext(CurrentUserContext);

  // Asignación de props a variables para generación de Popups
  const newCardPopup = { title: "Nuevo lugar", children: <NewCard /> };
  const EditProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const editAvatarPopup = {
    title: "Cambiar foto de perfil",
    children: <EditAvatar />,
  };

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__image"
          onClick={() => onOpenPopup(editAvatarPopup)}
        >
          <img
            src={currentUser.avatar}
            alt="Foto de perfil del usuario"
            className="profile__image-user"
          />
          <img
            src={editIcon}
            alt="Editar perfil"
            className="profile__image-edit"
          />
        </div>

        <div className="profile__info">
          <div className="profile__heading">
            <h1 className="profile__name">{currentUser.name}</h1>
            <div
              className="profile__edit"
              onClick={() => onOpenPopup(EditProfilePopup)}
            >
              <img
                src={editIcon}
                alt="Boton editar"
                className="profile__edit-image"
              />
            </div>
          </div>
          <h2 className="profile__hobby">{currentUser.about}</h2>
        </div>

        <div className="profile__add" onClick={() => onOpenPopup(newCardPopup)}>
          <img
            src={plusButton}
            alt="Botón más"
            className="profile__add-image"
          />
        </div>
      </section>

      <section className="photos">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onOpen={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
