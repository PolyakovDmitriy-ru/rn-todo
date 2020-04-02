import * as types from '../constants/dashboard';
import callApi from '../utils/call-api';

export function getTabl(tabl){
  return(dispatch, getState) => {

    const {isFetching, tekMenuGroup} = getState().services;

    const tekMenuGroupId = tekMenuGroup.id;

    if (isFetching.getTabl[tabl]) {
      return Promise.resolve();
    }      
    const {token} = getState().auth;
    if (!token) {
      dispatch({
        type: types.GETTABL_FAILURE,
        nameTabl: tabl,
      })     
    }
    dispatch({
      type: types.GETTABL_REQUEST,
      nameTabl: tabl,
    })   

    return callApi('/gettabl', token, {method: "POST"}, {
      tabl,
      tekMenuGroupId,
    })
      .then(json => {       
        dispatch({
          type: types.GETTABL_SUCCESS,
          payload: json,
          nameTabl: tabl,
        })  
      })
      .catch(reason => dispatch({
        type: types.GETTABL_FAILURE,
        payload: reason,
        nameTabl: tabl,
      }));

  }  
}



export function zapisatElement(tabl, data){

  return(dispatch, getState) => {
    const {isFetching, tekMenuGroup} = getState().services;
    const tekMenuGroupId = tekMenuGroup.id;

    if (isFetching.zapisatElement) {
      return Promise.resolve();
    }      
    const {token} = getState().auth;
    if (!token) {
      dispatch({
        type: types.ZAPISATELEMENT_FAILURE
      })     
    }

    dispatch({
      type: types.ZAPISATELEMENT_REQUEST
    })   

    return callApi('/zapisatElement', token, {method: "POST"}, {
      tabl,
      data,
      tekMenuGroupId,
    })
      .then(json => {       
        dispatch({
          type: types.ZAPISATELEMENT_SUCCESS,
          payload: json
        })  
      })
      .catch(reason => dispatch({
        type: types.ZAPISATELEMENT_FAILURE,
        payload: reason
      }));

  }  
}

export function deleteElement(tabl, data){
  return(dispatch, getState) => {
    const {isFetching, tekMenuGroup} = getState().services;
    const tekMenuGroupId = tekMenuGroup.id;
    if (isFetching.deleteElement) {
      return Promise.resolve();
    }      
    const {token} = getState().auth;
    if (!token) {
      dispatch({
        type: types.DELETEELEMENT_FAILURE
      })     
    }

    dispatch({
      type: types.DELETEELEMENT_REQUEST
    })   


    return callApi('/deleteElement', token, {method: "POST"}, {
      tabl,
      data,
      tekMenuGroupId,
    })
      .then(json => {       
        dispatch({
          type: types.DELETEELEMENT_SUCCESS,
          payload: json
        })  
      })
      .catch(reason => dispatch({
        type: types.DELETEELEMENT_FAILURE,
        payload: reason
      }));

  }  
}
