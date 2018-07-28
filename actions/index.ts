import { Action } from 'redux';
import { ICurrentQuiz, IDeck } from '../utils/seed-data';

export const SET_CURRENT_QUIZ = 'SET_CURRENT_QUIZ';
export const SET_DECKS = 'SET_DECKS';
export const SET_DECK = 'SET_DECK';

export interface IDecksAction extends Action {
  type: string;
  decks?: IDeck[];
  deck?: IDeck;
}
export interface ICurrentQuizAction extends Action {
  type: string;
  quiz: ICurrentQuiz;
}

export function setDecks(decks: IDeck[]): IDecksAction {
  return {
    decks,
    type: SET_DECKS,
  };
}
export function setDeck(deck: IDeck): IDecksAction {
  return {
    deck,
    type: SET_DECK,
  };
}

export function setCurrentQuiz(quiz: ICurrentQuiz): ICurrentQuizAction {
  return {
    quiz,
    type: SET_CURRENT_QUIZ,
  };
}
