
import {adressServera} from '../config';

export default function callApi(endpoint, token, options, payload) {
  const authHeaders = token ? {
    'Authorization' : `Bearer ${token}`  
  } : {};
  return fetch(`${adressServera}${endpoint}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
      ...authHeaders
    },
    body: JSON.stringify(payload),
    ...options
  })
    .then(response => response.json())
    .then(json => {
      if (json.success) {
        return json;
      }
      if (json.message === 'Пользователь не аутенфицирован!') {
        localStorage.setItem('token', '');
      }

      throw new Error(json.message);
    })     
}
