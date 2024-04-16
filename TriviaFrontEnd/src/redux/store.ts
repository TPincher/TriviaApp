import { createStore } from "redux";
import triviaReducer from "./reducers";

const store = createStore(triviaReducer);

export default store;
