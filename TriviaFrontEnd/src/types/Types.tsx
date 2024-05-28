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

export interface questionBlock {
  id: number;
  gameHistory: gameStats;
  killerQ: killerQ;
  questionText: string;
  answers: string;
  submittedAnswer: string;
  correctAnswer: string;
}

export interface gameStats {
  questionsBlockId: questionBlock[];
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
