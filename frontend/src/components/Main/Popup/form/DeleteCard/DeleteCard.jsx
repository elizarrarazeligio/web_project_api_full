export default function DeleteCard({ onCardDelete, card }) {
  return (
    <button
      className="form__button popup__button"
      type="button"
      onClick={() => onCardDelete(card)}
    >
      Sí
    </button>
  );
}
