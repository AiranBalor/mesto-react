import React from "react";
import profileEditButtonImage from "../images/edit-button.svg";
import cardAddButtonImage from "../images/add-button.svg";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__overlay">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Изображение профиля"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            onClick={onEditProfile}
          >
            <img
              className="profile__edit-button-picture"
              src={profileEditButtonImage}
              alt="Кнопка редактирования профиля"
            />
          </button>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        >
          <img
            className="profile__add-button-picture"
            src={cardAddButtonImage}
            alt="Кнопка добавления изображений на сайт"
          />
        </button>
      </section>

      <section className="photo-elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardDelete={onCardDelete}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
