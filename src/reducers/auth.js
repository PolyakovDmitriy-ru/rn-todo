
import * as types from '../constants';

const initialState = {
  isAuthenticated: false,
  user: null,
  token: '',
  getNotivication: false,
};

export default function auth(state = initialState, action) {
  switch(action.type){
    case types.GET_NOTIVICATION:
      return {
        ...state,
        getNotivication: true,
      }
    case types.SIGNUP_SUCCESS:
      return {
        ...state,
        podtverditEmail: action.payload.success
      }
    case types.PAROL_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };       
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case types.RECIEVE_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      }
    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
    case types.RECIEVE_AUTH_FAILURE:
    case types.LOGOUT_SUCCESS:
   case types.PAROL_FAILURE:  
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: '',
      };    
    default:
      return state;  
  }
}
