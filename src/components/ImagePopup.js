function ImagePopup({card, isOpen, onClose}) {
  return (
    <div className={`popup popup-view ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup-view__container">
        <button
          type="button"
          className="popup__close popup-view__close-button"
          onClick={onClose}
        ></button>
        <img className="popup-view__image" src={card.link} alt={card.name} />
        <h2 className="popup-view__card-title">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
