import { configureStore } from "@reduxjs/toolkit";
import triviaReducer from "./reducers";

const store = configureStore({
  reducer: {
    trivia: triviaReducer,
  },
});

export default store;
