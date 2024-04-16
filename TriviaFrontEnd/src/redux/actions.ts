import { SET_PLAYER, CHANGE_SCORE, UPDATE_QUESTIONS } from "./actionTypes";

export const setPlayer = (text: String) => ({
  type: SET_PLAYER,
  payload: { text },
});

export const changeScore = (score: Number) => ({
  type: CHANGE_SCORE,
  payload: { score },
});

export const updateQuestions = (question) => ({
  type: UPDATE_QUESTIONS,
  payload: { question },
});
