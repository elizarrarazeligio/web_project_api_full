import trashIcon from "../../assets/images/trash.png";
import likeIcon from "../../assets/images/boton_like.svg";
import ImagePopup from "../Main/Popup/ImagePopup/ImagePopup";
import DeleteCard from "../Main/Popup/form/DeleteCard/DeleteCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Card(props) {
  const { name, link, likes } = props.card;
  const { onOpen, onCardLike, onCardDelete, card } = props;
  const { currentUser } = useContext(CurrentUserContext);

  const imageComponent = {
    children: <ImagePopup link={link} place={name} />,
  };
  const deleteCardPopup = {
    title: "¿Estás seguro/a?",
    children: <DeleteCard onCardDelete={onCardDelete} card={card} />,
  };

  const isLiked = likes.some((like) => like._id === currentUser._id);

  const cardLikeButtonClassName = `photos__like ${
    isLiked ? "photos__like_active" : ""
  }`;

  return (
    <div className="photos__card">
      <img
        className="photos__image"
        src={link}
        alt=""
        onClick={() => onOpen(imageComponent)}
      />
      <img
        className="photos__trash"
        alt=""
        src={card.owner.name === currentUser.name ? trashIcon : ""}
        onClick={() => onOpen(deleteCardPopup)}
      />
      <div className="photos__heading">
        <h2 className="photos__place">{name}</h2>
        <div className="photos__likes">
          <img
            className={cardLikeButtonClassName}
            src={likeIcon}
            alt="Botón de Like"
            onClick={() => onCardLike(card, isLiked)}
          />
          <span className="photos__like-number">{likes.length}</span>
        </div>
      </div>
    </div>
  );
}
