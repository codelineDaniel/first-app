export interface Answers {
  answerNumber: number;
  answer: string;
  correct: boolean;
}

export interface Questions {
  questionNumber: number;
  question: string;
  answers: Answers[];
}

const questions = [
  {
    questionNumber: 1,
    question: "Co lubisz robić?",
    answers: [
      {
        answerNumber: 1,
        answer: "nic",
        correct: false,
      },
      {
        answerNumber: 2,
        answer: "coś",
        correct: true,
      },
      {
        answerNumber: 3,
        answer: "jeżdzić autem",
        correct: false,
      },
      {
        answerNumber: 4,
        answer: "drapać się po dupie",
        correct: false,
      },
    ],
  },
  {
    questionNumber: 2,
    question: "Lubisz mnie?",
    answers: [
      {
        answerNumber: 5,
        answer: "tak",
        correct: false,
      },
      {
        answerNumber: 6,
        answer: "nie",
        correct: true,
      },
      {
        answerNumber: 7,
        answer: "może",
        correct: false,
      },
      {
        answerNumber: 8,
        answer: "never",
        correct: false,
      },
    ],
  },
  {
    questionNumber: 3,
    question: "Ulubiony kolor?",
    answers: [
      {
        answerNumber: 9,
        answer: "niebieski",
        correct: false,
      },
      {
        answerNumber: 10,
        answer: "zielony",
        correct: true,
      },
      {
        answerNumber: 11,
        answer: "różowy",
        correct: false,
      },
      {
        answerNumber: 12,
        answer: "kolorowy",
        correct: false,
      },
    ],
  },
];

export default questions;
