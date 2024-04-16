import { SET_PLAYER, CHANGE_SCORE, UPDATE_QUESTIONS } from "./actionTypes";

const initialState = { player: "", score: 0, questions: [] };

const triviaReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PLAYER:
      return {
        player: action.payload.text,
        score: state.score,
        questions: state.questions,
      };

    case CHANGE_SCORE:
      return {
        player: state.player,
        score: action.payload.score,
        questions: state.questions,
      };

    case UPDATE_QUESTIONS:
      return {
        player: state.player,
        score: state.score,
        questions: [...state.questions, action.payload.question],
      };

    default:
      return state;
  }
};

export default triviaReducer;
