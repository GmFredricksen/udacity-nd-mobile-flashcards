import { combineReducers } from 'redux';

import {
  DecksInterface,
  CurrentQuizActionInterface,
  SET_CURRENT_QUIZ,
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

      if (deck) {
        return {
          ...state,
          [deck.key]: deck,
        }
      }
    default:
      return state;
  }
}

function currentQuiz(state = {}, action: CurrentQuizActionInterface): object {
  switch (action.type) {
    case SET_CURRENT_QUIZ:
      const { quiz } = action;

      return {
        ...state,
        ...quiz,
      }
    default:
      return state;
  }
}

export default combineReducers({
  currentQuiz,
  decks,
});
