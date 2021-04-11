import logo from "../images/logo.svg";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ onLogout, loggedIn, userEmail }) {
  const { pathname } = useLocation();
  const linkText = `${pathname === "/signin" ? "Регистрация" : "Войти"}`;
  const linkPath = `${pathname === "/signin" ? "/signup" : "/signin"}`;

  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип сайта Mesto" />
      {loggedIn ? (
        <div className="header__auth-info">
          <span className="header__auth-email">{userEmail}</span>
          <button className="header__singout" onClick={onLogout}>
            Выйти
          </button>
        </div>
      ) : (
        <Link to={linkPath} className="header__link">
          {linkText}
        </Link>
      )}
    </header>
  );
}

export default Header;
