import closeButton from "../../../assets/images/close_icon.svg";

export default function Popup(props) {
  const { onClose, title, children } = props;

  return (
    <section className="popup">
      <div className={title ? "popup__container" : "popup__content"}>
        <img
          src={closeButton}
          alt="Botón cerrar formulario"
          className="popup__close"
          onClick={onClose}
        />
        {title && <h2 className="popup__title">{title}</h2>}
        {children}
      </div>
    </section>
  );
}
