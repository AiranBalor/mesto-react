import React from "react";
import PopupWithForm from "./PopupWithForm";

function InfoTooltip({ isOpen, onClose, message }) {
  return (
    <PopupWithForm
      isModal={false}
      name={"authorization"}
      isOpen={isOpen}
      onClose={onClose}
      isForm={false}
    >
      <img
        src={message.icon}
        className="popup__tooltip-image"
        alt="иконка авторизации"
      />
      <p className="popup__tooltip-text">{message.text}</p>
    </PopupWithForm>
  );
}

export default InfoTooltip;
