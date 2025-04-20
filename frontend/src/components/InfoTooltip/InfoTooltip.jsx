export default function InfoTooltip({ advertise, icon }) {
  return (
    <div className="popup__info">
      <img src={icon} alt="Popup Icon" />
      <h2 className="popup__title">{advertise}</h2>
    </div>
  );
}
