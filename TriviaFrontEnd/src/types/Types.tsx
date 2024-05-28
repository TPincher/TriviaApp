export interface Game {
  difficulty: string;
  questionsBlockId: string[];
  score: number;
  id: string;
}

export interface User {
  name: string;
  gameHistory: Game[];
}

export interface killerQ {
  id: number;
  category: string;
  corrected: boolean;
}

export interface gameStats {
  questionsBlockId: qBlock[];
  question: string;
  answer: string;
  sAnswer: string;
  killerQ: number;
}

export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  answer: string;
  allAnswers: [];
}

export interface qBlock {
  answers: string;
  correctAnswer: string;
  id: number;
  questionText: string;
  submittedAnswer: string;
  killerQ: number;
}
