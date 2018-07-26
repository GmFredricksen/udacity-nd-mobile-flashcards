export interface Deck {
  [key: string]: Object,
  key: string,
  title: string,
  questions: [
    {
      question: string,
      answer: string,
    }
  ]
}

export interface CurrentQuiz {
  deckTitle: string,
  totalQuestions: number,
  correctAnswers: number,
  wrongAnswers: number,
  dateWhenPlayed: string,
}

export const decksSeedData = {
  React: {
    key: 'React',
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      }
    ]
  },
  JavaScript: {
    key: 'JavaScript',
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
      }
    ]
  },
  Rust: {
    key: 'Rust',
    title: 'Rust',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
      }
    ]
  }
};

export const currentQuizSeedData: CurrentQuiz = {
  deckTitle: '',
  totalQuestions: 0,
  correctAnswers: 0,
  wrongAnswers: 0,
  dateWhenPlayed: Date(),
};
