export interface User {
  id?: number;
  name: string;
}

export interface gameHistory {
  userId: number;
  difficulty: string;
  score: number;
}

export interface questionBlock {
  gameHistory: number;
  questionText: string;
  answers: string;
  submittedAnswer: string;
  correctAnswer: string;
}

export const getAllUsers = async () => {
  const response = await fetch("http://localhost:8080/users");
  if (!response.ok) {
    throw new Error("failed to load users");
  }
  const allUsers = await response.json();
  console.log(allUsers);
  return allUsers;
};

export const addUser = async (userData: String) => {
  const dataToSend = {
    name: userData,
  };
  const response = await fetch("http://localhost:8080/users", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to add user");
  }
  return response.json();
};

export const submitGameHistory = async (gameHistory: gameHistory) => {
  const dataToSend = {
    userId: gameHistory.userId,
    difficulty: gameHistory.difficulty,
    score: gameHistory.score,
  };
  const response = await fetch("http://localhost:8080/gameHistory", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to submit game results - gameHistory");
  }
  return response.json();
};

export const submitQuestionBlock = async (questionBlock: questionBlock) => {
  const dataToSend = {
    gameId: questionBlock.gameHistory,
    questionText: questionBlock.questionText,
    answers: questionBlock.answers,
    submittedAnswer: questionBlock.submittedAnswer,
    correctAnswer: questionBlock.correctAnswer,
  };
  const response = await fetch("http://localhost:8080/questionBlocks", {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to submit game results - questionBlock");
  }
  return response.json();
};

export const submitScoreToGameHistory = async (
  gameHistoryId: number,
  gameScore: number
) => {
  const dataToSend = {
    score: gameScore,
  };
  const response = await fetch(
    `http://localhost:8080/gameHistory/${gameHistoryId}`,
    {
      method: "PATCH",
      body: JSON.stringify(dataToSend),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update game results - score");
  }
  return response.json();
};
