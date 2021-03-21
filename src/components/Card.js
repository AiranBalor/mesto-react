import React from "react";

function Card({title, src, likes, onCardClick}) {

  function handleClick() {
    onCardClick({ title, src });
  }

  return(
    <article className="photo-element">
    <button
      type="button"
      className="photo-element__button-delete"
    ></button>
    <img className="photo-element__picture" src={src} alt={title} onClick={handleClick}/>
    <div className="photo-element__info">
      <h2 className="photo-element__title">{title}</h2>
      <div className="photo-element__likes-container">
        <button
          type="button"
          className="photo-element__button-like"
        ></button>
        <span className="photo-element__likes-counter">{likes.length}</span>
      </div>
    </div>
  </article>
  )
};

export default Card;