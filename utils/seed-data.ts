export interface IDeck {
  [key: string]: object;
  key: string;
  title: string;
  questions: [
    {
      question: string,
      answer: string,
    }
  ];
}

export interface ICurrentQuiz {
  deckTitle: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  dateWhenPlayed: string;
}

export const decksSeedData = {
  JavaScript: {
    key: 'JavaScript',
    questions: [
      {
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
        question: 'What is a closure?',
      },
    ],
    title: 'JavaScript',
  },
  React: {
    key: 'React',
    questions: [
      {
        answer: 'A library for managing user interfaces',
        question: 'What is React?',
      },
      {
        answer: 'The componentDidMount lifecycle event',
        question: 'Where do you make Ajax requests in React?',
      },
    ],
    title: 'React',
  },
  Rust: {
    key: 'Rust',
    questions: [
      {
        answer: 'The combination of a function and the lexical environment within which that function was declared.',
        question: 'What is a closure?',
      },
    ],
    title: 'Rust',
  },
};

export const currentQuizSeedData: ICurrentQuiz = {
  correctAnswers: 0,
  dateWhenPlayed: Date(),
  deckTitle: '',
  totalQuestions: 0,
  wrongAnswers: 0,
};
