import React from "react";

function PopupWithForm({ name, title, children, text, isOpen, onClose }) {
  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
      <form className="popup__form popup__container" noValidate>
        <h2 className="popup__container-title">{title}</h2>
        {children}
        <button type="submit" className="popup__submit">
          {text}
        </button>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </form>
    </div>
  );
}

export default PopupWithForm;
