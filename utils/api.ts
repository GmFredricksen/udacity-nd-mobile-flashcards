import { AsyncStorage } from 'react-native';
import { currentQuizSeedData, decksSeedData, CurrentQuiz, Deck } from './seed-data';
import { Notifications, Permissions } from 'expo';

import { createNotification } from './helpers';

export const DECKS_STORAGE_KEY = 'GmFlashcards:decks';
export const CURRENT_QUIZ_STORAGE_KEY = 'GmFlashcards:currentQuiz';
export const NOTIFICATION_KEY = 'GmFlashcards:notifications'

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

export const addCardToDeck = (deckTitle: string, cardObject: object) => {
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

/**
 * Local notifications
 */
export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              let tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(14);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'minute',
                },
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
            }
          })
      }
    })
}
