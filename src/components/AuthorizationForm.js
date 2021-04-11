import React from "react";
import { Link } from "react-router-dom";

function AuthorizationForm({ children, title, text, active, onSubmit }) {
  return (
    <div className="authorization">
      <div className="authorization__container">
        <h2 className="authorization__title">{title}</h2>
        <form
          className="authorization__form"
          onSubmit={onSubmit}
          action="#"
          noValidate
        >
          {children}
          <button type="submit" className="authorization__submit-button">
            {text}
          </button>
        </form>
        <p className={`authorization__text ${active}`}>
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="authorization__link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthorizationForm;
