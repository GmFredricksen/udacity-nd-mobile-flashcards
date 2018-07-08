import { Action } from 'redux';

export const SET_DECKS = 'SET_DECKS';

export interface DecksInterface extends Action {
  type: string,
  decks?: object,
}

export function setDecks(decks: object): DecksInterface {
  return {
    type: SET_DECKS,
    decks,
  }
}
