import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY } from './seed-data';

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
