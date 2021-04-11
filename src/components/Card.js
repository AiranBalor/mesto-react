import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = `${
    isOwn
      ? "photo-element__button-delete"
      : "photo_element__button-delete_hidden"
  }`;

  const isLiked = card.likes.some((item) => item._id === currentUser._id);

  const cardLikeButtonClassName = `${
    isLiked ? "photo-element__button-like_active" : ""
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <article className="photo-element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <img
        className="photo-element__picture"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="photo-element__info">
        <h2 className="photo-element__title">{card.name}</h2>
        <div className="photo-element__likes-container">
          <button
            type="button"
            className={`photo-element__button-like ${cardLikeButtonClassName}`}
            onClick={handleLikeClick}
          />
          <span className="photo-element__likes-counter">
            {card.likes.length}
          </span>
        </div>
      </div>
    </article>
  );
}

export default Card;
