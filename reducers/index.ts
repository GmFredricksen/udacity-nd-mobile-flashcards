import { Action, combineReducers } from 'redux';

import {
  DecksInterface,
  SET_DECKS,
  SET_DECK,
} from '../actions';

function decks(state = {}, action: DecksInterface): object {
  switch (action.type) {
    case SET_DECKS:
      return {
        ...state,
        ...action.decks,
      }
    case SET_DECK:
      const { deck } = action;

      return {
        ...state,
        [deck.key]: deck,
      }
    default:
      return state;
  }
}

export default combineReducers({ decks });
