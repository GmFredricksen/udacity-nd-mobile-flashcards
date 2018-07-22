import { Action } from 'redux';
import { CurrentQuiz, Deck } from '../utils/seed-data';

export const SET_CURRENT_QUIZ = 'SET_CURRENT_QUIZ';
export const SET_DECKS = 'SET_DECKS';
export const SET_DECK = 'SET_DECK';

export interface DecksInterface extends Action {
  type: string,
  decks?: Deck[],
  deck?: Deck,
}
export interface CurrentQuizActionInterface extends Action {
  type: string,
  quiz: CurrentQuiz,
}

export function setDecks(decks: Deck[]): DecksInterface {
  return {
    type: SET_DECKS,
    decks,
  }
}
export function setDeck(deck: Deck): DecksInterface {
  return {
    type: SET_DECK,
    deck,
  }
}

export function setCurrentQuiz(quiz: CurrentQuiz): CurrentQuizActionInterface {
  return {
    type: SET_CURRENT_QUIZ,
    quiz,
  }
}
