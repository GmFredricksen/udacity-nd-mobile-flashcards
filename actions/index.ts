import { Action } from 'redux';

export const SET_DECKS = 'SET_DECKS';
export const SET_DECK = 'SET_DECK';

export interface DecksInterface extends Action {
  type: string,
  decks?: object,
  deck?: object,
}

export function setDecks(decks: object): DecksInterface {
  return {
    type: SET_DECKS,
    decks,
  }
}
export function setDeck(deck: object): DecksInterface {
  return {
    type: SET_DECK,
    deck,
  }
}
