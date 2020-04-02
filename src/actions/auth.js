import * as types from '../constants/auth';
import callApi from '../utils/call-api';
import * as SecureStore from 'expo-secure-store';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';

export function getNotivications() {
  return async (dispatch, getState) => {
    dispatch({
      type: types.GET_NOTIVICATION
    })
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    let tokenNotivications = '';
    if (status !== 'granted') {
      alert('No notification permissions!');
    } else {
      tokenNotivications = await Notifications.getExpoPushTokenAsync();
    }

    const {token} = getState().auth;
    if (!token) {
      return Promise.resolve();   
    }
    if (!tokenNotivications) {
      return Promise.resolve();
    }

    return callApi('/tokennotification', token, {method: "POST"}, {
      tokenNotivications,
      platform: Platform.OS,
    })

  }
}


export function signup(email, msg){
  return (dispatch, getState) => {
    const {isFetching} = getState().services;
    if (isFetching.signup) {
     return Promise.resolve();
    }

    dispatch({
      type: types.SIGNUP_REQUEST
    })

    return callApi('/signup', undefined, {method: "POST"}, {
      email,
      msg
    })
      .then(json => {        
        dispatch({
          type: types.SIGNUP_SUCCESS,
          payload: json
        })  
      })
      .catch(reason => dispatch({
        type: types.SIGNUP_FAILURE,
        payload: reason
      }));
  };
}

export function zadatParol(email, password, kod){
  return (dispatch, getState) => {
    const {isFetching} = getState().services;
    if (isFetching.zadatParol) {
     return Promise.resolve();
    }

    dispatch({
      type: types.PAROL_REQUEST
    })

    const x = new Date();
    // Вычислим значение смещения текущего часового пояса в часах
    const caspoyas = -x.getTimezoneOffset();
    const platform = Platform.OS;

    return callApi('/zadatparol', undefined, {method: "POST"}, {
      email,
      caspoyas,
      password,
      kod,
      platform,
    })
      .then(json => {
        if (!json.token) {
          throw new Error('Джок токен!');
        }      
        SecureStore.setItemAsync('token', json.token);          
        dispatch({
          type: types.PAROL_SUCCESS,
          payload: json
        })  
      })
      .catch(reason => dispatch({
        type: types.PAROL_FAILURE,
        payload: reason
      }));
  };
}


export function login(email, password){
  return (dispatch, getState) => {
    const {isFetching} = getState().services;
    if (isFetching.login) {
      return Promise.resolve();
    }    
    dispatch({
      type: types.LOGIN_REQUEST
    })

    return callApi('/login', undefined, {method: "POST"}, {
      email,
      password,
    })     
      .then(json => {
        if (!json.token) {
          throw new Error('Джок токен!');
        }      
        SecureStore.setItemAsync('token', json.token);          
        
        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: json
        })  
      })
      .catch(reason => dispatch({
        type: types.LOGIN_FAILURE,
        payload: reason
      }));
  };
}

export function logout(){

  return (dispatch) => {  
    SecureStore.deleteItemAsync('token');
    dispatch({
      type: types.LOGOUT_SUCCESS
    })
  }; 
}

export function recieveAuth() {
  return(dispatch, getState) => {
    const {isFetching} = getState().services;
    if (isFetching.recieveAuth) {
      return Promise.resolve();
    }      
    SecureStore.getItemAsync('token')
    .then((token)=>{
      if (!token) {
        dispatch({
          type: types.RECIEVE_AUTH_FAILURE,
          payload: null,
        })
        return Promise.resolve();
      }
      return callApi('/userauth', token)
      .then(json => {       
        dispatch({
          type: types.RECIEVE_AUTH_SUCCESS,
          payload: {...json, token: token}
        })  
      })
      .catch(reason => dispatch({
        type: types.RECIEVE_AUTH_FAILURE,
        payload: reason
      }));
    })
    .catch((err)=>{
      dispatch({
        type: types.RECIEVE_AUTH_FAILURE,
        payload: null,
      })
      return Promise.resolve();
    })

 }
}

