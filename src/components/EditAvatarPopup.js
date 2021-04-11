import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      text={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isForm={true}
    >
      <label className="popup__label">
        <input
          name="link"
          id="avatar-link-input"
          className="popup__input popup__input_type_card-link"
          type="url"
          placeholder="Ссылка на аватар"
          ref={inputRef}
          required
        />
        <span className="popup__input-error avatar-link-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
