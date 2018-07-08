import { AsyncStorage } from 'react-native';
import { DECKS_STORAGE_KEY } from './seed-data';

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse);
}

export const getDeck = (deckId) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(JSON.parse)
    .then((decks) => decks[deckId]);
}

// export const saveDeckTitle = (deckTitle: String) => {

// }

// export const addCardToDeck = (deckTitle: String, card: Object) => {

// }
