import config from '../config/config.json';
import types from './types';

export function fetchSearchResults(addresses, radius = 16093.4) {
  // TODO --- make request to backend web server for data
  return (dispatch, getState) => {
    dispatch(searching(true));
    dispatch(saveInputAddresses(addresses));
    const body = { 
      addresses,
      radius
    };

    return fetch(config.urls.search, {
      method: 'post',
      body : JSON.stringify(body),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(r => r.json())
    .then(result => {
      return dispatch(saveSearchResults(result));
    })
    .catch(e => {
      console.warn('[ERROR] ', e);
    });
  } 
}


export function searching(bool) {
  return {
    type : types.SEARCHING,
    isSearching : bool
  }
}

export function saveSearchResults(data) {
  return {
    type : types.SAVE_SEARCH_RESULTS,
    data
  }
}

export function saveInputAddresses(inputAddresses) {
  return {
    type : types.SAVE_SEARCH_INPUTS,
    inputAddresses
  }
}