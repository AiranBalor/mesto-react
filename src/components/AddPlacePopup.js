import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      name={"card"}
      title={"Новое место"}
      text={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isForm={true}
    >
      <label className="popup__label">
        <input
          name="name"
          id="card-name-input"
          className="popup__input popup__input_type_card-name"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handleChangeCardName}
          required
        />
        <span className="popup__input-error card-name-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          name="link"
          id="card-link-input"
          className="popup__input popup__input_type_card-link"
          type="url"
          placeholder="Ссылка на картинку"
          onChange={handleChangeCardLink}
          required
        />
        <span className="popup__input-error card-link-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
