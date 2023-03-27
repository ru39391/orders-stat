import { Component } from 'react';
import { API_URL } from './config';
import { ERROR_MSG } from './constants';

class Api extends Component {
  constructor() {
    super();
    this._baseUrl = API_URL;
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

  fetchData(path) {
    return fetch(`${this._baseUrl}${path}`, {
      method: 'GET',
      headers: this._setHeaders()
    })
      .then((res) => {
        return this._checkResponse(res, ERROR_MSG);
      });
  }
}

const api = new Api();

export default api;
