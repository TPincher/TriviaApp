import {
  SET_PLAYER,
  CHANGE_SCORE,
  UPDATE_QUESTIONS,
  UPDATE_DIFFICULTY,
  UPDATE_CATEGORY,
} from "./actionTypes";

export interface Category {
  name: String;
  id: Number;
}

export interface Player {
  name: String;
  id: Number;
}

export const setPlayer = (player: Player) => ({
  type: SET_PLAYER,
  payload: { player },
});

export const changeScore = (score: Number) => ({
  type: CHANGE_SCORE,
  payload: { score },
});

export const updateQuestions = (question: any) => ({
  type: UPDATE_QUESTIONS,
  payload: { question },
});

export const updateDifficulty = (difficulty: String) => ({
  type: UPDATE_DIFFICULTY,
  payload: { difficulty },
});

export const updateCategory = (category: Category) => ({
  type: UPDATE_CATEGORY,
  payload: { category },
});
