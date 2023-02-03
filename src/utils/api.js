import React from 'react';
import { apiUrl } from './constants';

class Api extends React.Component {
  constructor(baseUrl) {
    super();
    this._baseUrl = baseUrl;
  }

  _checkResponse(result, resultAlert) {
    if (result.ok) {
      return result.json();
    }

    return Promise.reject(`${resultAlert}: ${result.status}`);
  }

  _setHeaders() {
    return {
      'Content-Type': 'application/json'
    };
  }

  getInitialData() {
    return fetch(`${this._baseUrl}/orders`, {
      method: 'GET',
      headers: this._setHeaders()
    })
      .then((res) => {return this._checkResponse(res, 'Ошибка при загрузке карточек')});
  }
}

const api = new Api(apiUrl);

export default api;