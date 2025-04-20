export default function ImagePopup(props) {
  const { link, place } = props;

  return (
    <>
      <img src={link} alt={`Imagen de ${place}`} className="popup__image" />
      <h2 className="popup__place">{place}</h2>
    </>
  );
}
