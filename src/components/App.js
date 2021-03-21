import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
  }

  return (
    <div className="App page">
      <div className="page__container">
        <Header />
        <Main
          onEditProfile={() => {
            handleEditProfileClick();
          }}
          onAddPlace={() => {
            handleAddPlaceClick();
          }}
          onEditAvatar={() => {
            handleEditAvatarClick();
          }}
          onCardClick={(card) => {
            handleCardClick(card);
          }}
        />
        <Footer />
        <PopupWithForm
          name={"profile"}
          title={"Редактировать профиль"}
          children={
            <>
              <label className="popup__label">
                <input
                  name="name"
                  id="profile-name-input"
                  className="popup__input popup__input_type_name"
                  type="text"
                  placeholder="Имя"
                  minLength="2"
                  maxLength="40"
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
                  required
                />
                <span className="popup__input-error profile-profession-input-error"></span>
              </label>
            </>
          }
          text={"Сохранить"}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name={"card"}
          title={"Новое место"}
          children={
            <>
              <label className="popup__label">
                <input
                  name="name"
                  id="card-name-input"
                  className="popup__input popup__input_type_card-name"
                  type="text"
                  placeholder="Название"
                  minLength="2"
                  maxLength="30"
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
                  required
                />
                <span className="popup__input-error card-link-input-error"></span>
              </label>
            </>
          }
          text={"Создать"}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name={"delete"}
          title={"Вы уверены?"}
          children={<></>}
          text={"Да"}
        />

        <PopupWithForm
          name={"avatar"}
          title={"Обновить аватар"}
          children={
            <>
              <label className="popup__label">
                <input
                  name="link"
                  id="avatar-link-input"
                  className="popup__input popup__input_type_card-link"
                  type="url"
                  placeholder="Ссылка на аватар"
                  required
                />
                <span className="popup__input-error avatar-link-input-error"></span>
              </label>
            </>
          }
          text={"Сохранить"}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </div>
  );
}

export default App;
