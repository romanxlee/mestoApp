export default class Api {
    constructor(options) {
        this.url = options.baseUrl;
        this.headers = options.headers;
    }

    _getResponseData(res) {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
      }
      return res.json();
      }

    getUserData() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers
        })
        .then(this._getResponseData)         
    }

    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers
        })
        .then(this._getResponseData)
    }

    changeUserInfo(name, about) {
        return fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
        name: name,
        about: about
  })
})
    .then(this._getResponseData)
    }
}