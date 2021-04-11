import handleOriginalResponse from './utils';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  getUserInfoFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  getAllInfo() {
    return Promise.all([this.getUserInfoFromServer(), this.getInitialCards()]);
  }

  updateUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then(handleOriginalResponse);
  }

  sendNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    }).then(handleOriginalResponse);
  }

  deleteCardFromServer(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  changeLikeCardStatus(cardId, status) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: (status) ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  updateAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatarLink),
    }).then(handleOriginalResponse);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-20",
  headers: {
    authorization: "8e6db405-93d3-4564-862a-de4e30ec51f5",
    "Content-Type": "application/json",
  },
});

export default api;
