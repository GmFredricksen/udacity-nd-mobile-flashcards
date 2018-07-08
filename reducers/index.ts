import { Action, combineReducers } from 'redux';

import {
  SET_DECKS, DecksInterface,
} from '../actions';

function decks(state = {}, action: DecksInterface): object {
  switch (action.type) {
    case SET_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    default:
      return state;
  }
}

export default combineReducers({ decks });
