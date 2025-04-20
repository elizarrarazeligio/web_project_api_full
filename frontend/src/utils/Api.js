class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Función Promise para obtener información inicial de usuario del servidor
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      }
    );
  }

  // Función Promise para obtener cartas iniciales del servidor
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
      }
    );
  }

  //Función Promise para editar información de usuario
  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Función Promise para añadir nueva tarjeta
  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Función Promise para borrar tarjeta
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Función Promise para cambiar foto de perfil de usuario
  changeProfilePicture(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Función Promise para añadir Like a la publicación
  _addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Función para borrar Like a la publicación
  _removeLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Error: ${res.status}`);
    });
  }

  // Función para cambiar estado de Like a publicación
  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return this._removeLike(id);
    } else {
      return this._addLike(id);
    }
  }
}

// Creación de instancia de Api para solicitudes a servidor
export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/web-es-cohort-17",
  headers: {
    authorization: "f05ef4e2-b711-4c0d-bffb-160d98715bd3",
    "Content-Type": "application/json",
  },
});
