import { combineReducers } from 'redux';
import types from './types';
import * as utils from '../utils/clientUtils';

export default combineReducers({
  searchResults(state = [], action) {
    switch (action.type) {
      case types.SAVE_SEARCH_RESULTS :
        return utils.formatSearchData(action.data);
      default :
        return state;
    }
  },

  searching(state = false, action) {
    switch (action.type) {
      case types.SEARCHING :
        return action.isSearching;
      default :
        return state;
    }
  },

  inputAddresses(state = [], action) {
    switch (action.type) {
      case types.SAVE_SEARCH_INPUTS :  
        return action.inputAddresses;
      default :
        return state;
    }
  }
})