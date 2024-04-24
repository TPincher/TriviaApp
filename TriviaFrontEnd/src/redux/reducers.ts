import {
  SET_PLAYER,
  CHANGE_SCORE,
  UPDATE_QUESTIONS,
  UPDATE_CATEGORY,
  UPDATE_DIFFICULTY,
} from "./actionTypes";

const initialState = {
  player: "",
  score: 0,
  questions: [],
  difficulty: "",
  category: "",
};

const triviaReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_PLAYER:
      return {
        player: action.payload.text,
        score: state.score,
        questions: state.questions,
        difficulty: state.difficulty,
        category: state.category,
      };

    case CHANGE_SCORE:
      return {
        player: state.player,
        score: action.payload.score,
        questions: state.questions,
        difficulty: state.difficulty,
        category: state.category,
      };

    case UPDATE_QUESTIONS:
      return {
        player: state.player,
        score: state.score,
        questions: [...state.questions, action.payload.question],
        difficulty: state.difficulty,
        category: state.category,
      };

    case UPDATE_DIFFICULTY:
      return {
        player: state.player,
        score: state.score,
        questions: state.questions,
        difficulty: action.payload.difficulty,
        category: state.category,
      };

    case UPDATE_CATEGORY:
      return {
        player: state.player,
        score: state.score,
        questions: state.questions,
        difficulty: state.difficulty,
        category: action.state.category,
      };

    default:
      return state;
  }
};

export default triviaReducer;
