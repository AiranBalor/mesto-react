import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setUserName] = React.useState("");
  const [description, setUserDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  function handleChangeUserName(e) {
    setUserName(e.target.value);
  }

  function handleChangeUserDescription(e) {
    setUserDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setUserName(currentUser.name);
    setUserDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      text={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isForm={true}
    >
      <label className="popup__label">
        <input
          name="name"
          id="profile-name-input"
          className="popup__input popup__input_type_name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          onChange={handleChangeUserName}
          value={name || ""}
          required
        />
        <span className="popup__input-error profile-name-input-error"></span>
      </label>
      <label className="popup__label">
        <input
          name="profession"
          id="profile-profession-input"
          className="popup__input popup__input_type_profession"
          type="text"
          placeholder="Профессия"
          minLength="2"
          maxLength="200"
          onChange={handleChangeUserDescription}
          value={description || ""}
          required
        />
        <span className="popup__input-error profile-profession-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
