export interface Deck {
  [key:string]: Object,
  key: string,
  title: string,
  questions: [
    {
      question: string,
      answer: string,
      result: boolean,
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
        answer: 'A library for managing user interfaces',
        result: true
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
        result: true
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
        result: true
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
        result: true
      }
    ]
  }
};
