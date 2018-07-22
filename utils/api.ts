import { AsyncStorage } from 'react-native';
import { currentQuizSeedData, decksSeedData, CurrentQuiz, Deck } from './seed-data';

export const DECKS_STORAGE_KEY = 'GmFlashcards:decks';
export const CURRENT_QUIZ_STORAGE_KEY = 'GmFlashcards:currentQuiz';

/**
 * Decks storage methods
 */
export const setSeedData = () => {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decksSeedData));

  return decksSeedData;
}

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse);
}

export const getDeck = (deckId: string) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((decks) => decks[deckId]);
}

export const saveDeckTitle = (deckTitle: string) => {
  const newDeckToBeSaved = {
    [deckTitle]: {
      key: deckTitle,
      title: deckTitle,
      questions: [],
    }
  };

  return AsyncStorage
    .mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeckToBeSaved))
    .then(() => {
      return AsyncStorage.getItem(DECKS_STORAGE_KEY)
        .then(JSON.parse)
        .then(decks => decks);
    });
}

export const addCardToDeck = (deckTitle: string, cardObject: Deck) => {
  return getDeck(deckTitle)
    .then((selectedDeck) => {
      const deckToBeUpdated = {
        [selectedDeck.key]: {
          ...selectedDeck,
          questions: [
            ...selectedDeck.questions,
            cardObject,
          ],
        }
      };

      return AsyncStorage
        .mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deckToBeUpdated))
        .then(() => deckToBeUpdated);
    });
}

/**
 * Current Quiz storage methods
 */

export const initCurrentQuizData = (deck: Deck) => {
  const currentQuizToBeSaved = {
    ...currentQuizSeedData,
    deckTitle: deck.title,
    totalQuestions: deck.questions.length,
  }

  return AsyncStorage.setItem(CURRENT_QUIZ_STORAGE_KEY, JSON.stringify(currentQuizToBeSaved))
    .then(() => AsyncStorage.getItem(CURRENT_QUIZ_STORAGE_KEY)
      .then(JSON.parse));
}
export const setCurrentQuizData = (currentQuiz: CurrentQuiz) => {
  const currentQuizToBeSaved = {
    ...currentQuiz,
    dateWhenPlayed: Date(),
  }

  return AsyncStorage.setItem(CURRENT_QUIZ_STORAGE_KEY, JSON.stringify(currentQuizToBeSaved))
    .then(() => AsyncStorage.getItem(CURRENT_QUIZ_STORAGE_KEY)
      .then(JSON.parse));
}
