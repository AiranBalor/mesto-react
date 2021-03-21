import React from "react";
import profileEditButtonImage from "../images/edit-button.svg";
import cardAddButtonImage from "../images/add-button.svg";
import api from "../utils/api.js";
import Card from "./Card";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getAllInfo()
      .then(([userInfoServer, cards]) => {
        setUserName(userInfoServer.name);
        setUserDescription(userInfoServer.about);
        setUserAvatar(userInfoServer.avatar);

        const cardInstance = cards.map((cardElement) => ({
          title: cardElement.name,
          src: cardElement.link,
          likes: cardElement.likes,
          id: cardElement._id,
        }));
        setCards(cardInstance);
      })
      .catch((err) => {
        console.log(`Ошибка - ${err.status}`);
      });
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__overlay">
          <img
            className="profile__avatar"
            src={userAvatar}
            alt="Изображение профиля"
            onClick={onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
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
          <p className="profile__profession">{userDescription}</p>
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
        {cards.map(({ id, ...item }) => (
          <Card key={id} {...item} onCardClick={onCardClick} />
        ))}
      </section>

      <template className="template-photo">
        <article className="photo-element">
          <button
            type="button"
            className="photo-element__button-delete"
          ></button>
          <img className="photo-element__picture" src="#" alt="#" />
          <div className="photo-element__info">
            <h2 className="photo-element__title"></h2>
            <div className="photo-element__likes-container">
              <button
                type="button"
                className="photo-element__button-like"
              ></button>
              <span className="photo-element__likes-counter">0</span>
            </div>
          </div>
        </article>
      </template>
    </main>
  );
}

export default Main;
