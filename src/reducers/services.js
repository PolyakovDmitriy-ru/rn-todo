import * as types from '../constants';
import {combineReducers} from 'redux';

const initialState = {
  isFetching: {
    signup: false,
    zadatParol: false,
    login: false,
    recieveAuth: false,
    startAuth: false,
    zapisatElement: false,
    deleteElement: false,
    getTabl: {},
  },
  message: {
    msg: '',
    openMsg: false,
    variantMsg: '',
  },
  tekMenuGroup: {
    id: '',
    name: 'Личные данные ',
  },
}

export const tekMenuGroup = (state = initialState.tekMenuGroup, action) => {
  switch (action.type) {
    case types.SET_MENU_GROUP:
      return {...state, id: action.payload.id, name: action.payload.name};
    default:
      return state;
  }
}

export const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
      return {...state, signup: true};
    case types.PAROL_REQUEST:
      return {...state, zadatParol: true}
    case types.LOGIN_REQUEST:
      return {...state, login: true};
    case types.RECIEVE_AUTH_REQUEST:
      return {...state, recieveAuth: true};
    case types.ZAPISATELEMENT_REQUEST:
      return {...state, zapisatElement: true}; 
    case types.GETTABL_REQUEST:
      let getTablNew = Object.assign({}, state.getTabl);
      getTablNew[action.nameTabl] = true;      
      return {...state, getTabl: getTablNew};
    case types.DELETEELEMENT_REQUEST:
      return {...state, deleteElement: true}
      
    case types.SIGNUP_SUCCESS:
    case types.SIGNUP_FAILURE:
      return {...state, signup: false};
    case types.PAROL_SUCCESS:
    case types.PAROL_FAILURE:
      return {...state, zadatParol: false};    
    case types.LOGIN_SUCCESS:
    case types.LOGIN_FAILURE:      
      return {...state, login: false};
    case types.RECIEVE_AUTH_SUCCESS:
    case types.RECIEVE_AUTH_FAILURE:      
      return {...state, recieveAuth: false, startAuth: true};
    case types.ZAPISATELEMENT_SUCCESS:
    case types.ZAPISATELEMENT_FAILURE:
      return {...state, zapisatElement: false}
    case types.GETTABL_SUCCESS:
    case types.GETTABL_FAILURE:
      let getTablNew1 = Object.assign({}, state.getTabl);
      getTablNew1[action.nameTabl] = false;
      return {...state, getTabl: getTablNew1}
    case types.DELETEELEMENT_SUCCESS:
    case types.DELETEELEMENT_FAILURE:
      return {...state, deleteElement: false}
    default:
      return state;
  }
}

export const message = (state = initialState.message, action) => {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        openMsg: true,
        msg: action.payload.message,
        variantMsg: 'success'
      };

    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
    case types.PAROL_FAILURE: 
    case types.NEW_ERROR:    
      return {
        ...state,
        openMsg: true,
        msg: action.payload.message,
        variantMsg: 'error',
      };

    case types.CLOSE_MSG:
      return {
        ...state,
        openMsg: false,
        variantMsg: '',
      }
    default:
      return state;  
    }
}

export default combineReducers({
  isFetching,
  message,
  tekMenuGroup,
})
