import * as types from '../constants';
import {combineReducers} from 'redux';

const initialState = {
  tabl: {},
  tablsuccess: {},
};

export const tablsuccess = (state = initialState.tablsuccess, action) =>{

  switch (action.type) {
    case types.GETTABL_SUCCESS:
      let newState = Object.assign({}, state);
      newState[action.payload.data.nameKey] = true;
      return newState;
    case types.SET_MENU_GROUP:
      return {};  
    default:
      return state;
  }
}

export const tabl = (state = initialState.tabl, action) => {

  switch(action.type){
    case types.ZAPISATELEMENT_SUCCESS:
    case types.GETTABL_SUCCESS: 
    case types.DELETEELEMENT_SUCCESS:
    case types.PRIGLUSER_SUCCESS:

      let newTabl = Object.assign({}, state.tabl);

      newTabl[action.payload.data.nameKey]= action.payload.data;
      
      if (newTabl[action.payload.data.nameKey].sort) {
        newTabl[action.payload.data.nameKey].data.sort((prev, next)=>{
          if (prev[newTabl[action.payload.data.nameKey].sort] < next[newTabl[action.payload.data.nameKey].sort]) return -1;
          if (prev[newTabl[action.payload.data.nameKey].sort] === next[newTabl[action.payload.data.nameKey].sort]) return 0;
          if (prev[newTabl[action.payload.data.nameKey].sort] > next[newTabl[action.payload.data.nameKey].sort]) return 1;
        })
      }

      return {
        ...state,
        tabl: newTabl

      }
    
    case types.RECIEVE_AUTH_SUCCESS:

      return {
        ...state,
        tabl: action.payload.tabl,

      }

    default:
      return state;  
  }
}    

export default combineReducers({
  tablsuccess,
  tabl,
})
