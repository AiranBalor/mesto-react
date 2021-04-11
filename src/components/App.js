import React from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import successIcon from "../images/success-icon.svg";
import failureIcon from "../images/failure-icon.svg";
import * as auth from "../utils/auth.js";

function App() {
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState({
    icon: "",
    text: "",
  });
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const history = useHistory();

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
    setInfoTooltipOpen(false);
  }

  function handleUpdateUser(info) {
    api
      .updateUserInfo(info)
      .then((info) => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .updateAvatar(avatarLink)
      .then((link) => {
        setCurrentUser(link);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCardFromServer(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .sendNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getAllInfo()
        .then(([userInfo, cardsInfo]) => {
          setCurrentUser(userInfo);
          setCards(cardsInfo);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((data) => {
          setEmail(data.data.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.error(err);
          setMessage({
            icon: failureIcon,
            text: "Что-то пошло не так! Попробуйте ещё раз.",
          });
          setInfoTooltipOpen(true);
        });
    } else return;
  }, [loggedIn, history]);

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setEmail(email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          icon: failureIcon,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setInfoTooltipOpen(true);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setEmail("");
    setLoggedIn(false);
    history.push("/signin");
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setEmail(res.email);
        }
        history.push("/signin");
        setMessage({
          icon: successIcon,
          text: "Вы успешно зарегистрировались!",
        });
        setInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.error(err);
        setMessage({
          icon: failureIcon,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        setInfoTooltipOpen(true);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App page">
        <div className="page__container">
          <Header
            onLogout={handleLogout}
            loggedIn={loggedIn}
            userEmail={email}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              handleLogout={handleLogout}
              component={Main}
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={(card) => {
                handleCardClick(card);
              }}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
            <Route path="/signin">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <Register onRegister={handleRegister} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
            </Route>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name={"delete"}
            title={"Вы уверены?"}
            children={<></>}
            text={"Да"}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            message={message}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
