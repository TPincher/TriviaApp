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

export interface killerQ {
  category: string;
  corrected: boolean;
  user: number;
  questionBlock: number;
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

export const getUser = async (userId: number) => {
  const response = await fetch(`http://localhost:8080/users/${userId}`);
  if (!response.ok) {
    throw new Error("failed to load user");
  }
  const userData = await response.json();
  console.log(userData);
  return userData;
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

export const getGameHistory = async (gameHistoryId: number) => {
  const response = await fetch(
    `http://localhost:8080/gameHistory/${gameHistoryId}`
  );
  if (!response.ok) {
    throw new Error("failed to load gameHistory");
  }
  const details = await response.json();
  console.log(details);
  return details;
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

export const submitkillerQ = async (killerQ: killerQ) => {
  const dataToSend = {
    category: killerQ.category || "none selected",
    corrected: killerQ.corrected,
    userId: killerQ.user,
    questionBlockId: killerQ.questionBlock,
  };
  const response = await fetch(`http://localhost:8080/killerQs`, {
    method: "POST",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update game results - killerQ");
  }
  return response.json();
};

export const updateKillerQ = async (id: number) => {
  const dataToSend = {
    corrected: true,
  };
  const response = await fetch(`http://localhost:8080/killerQs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to update game results - killerQCorrection");
  }
  return response.json();
};
