import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'GmFlashcards:decks'

interface seedData {
  key: string,
  title: string,
  questions: [
    {
      question: string,
      answer: string,
    }
  ]
}

export const seedData = {
  React: {
    key: 'React',
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    key: 'JavaScript',
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Rust: {
    key: 'Rust',
    title: 'Rust',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

export const setSeedData = () => {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(seedData));

  return seedData;
}
