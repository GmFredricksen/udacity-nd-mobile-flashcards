import { Action } from 'redux';

export const SET_DECKS = 'SET_DECKS';

interface setDecks extends Action {
  type: string,
  decks: object,
}

export function setDecks(decks: object): setDecks {
  return {
    type: SET_DECKS,
    decks,
  }
}
