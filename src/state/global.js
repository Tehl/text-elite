import { combineReducers } from "redux";
import { combineSelectors } from "combine-selectors-redux";
import { playerReducer, playerSelectors } from "./player";

const globalReducer = combineReducers({
  player: playerReducer
});

const globalSelectors = combineSelectors({
  player: playerSelectors
});

export { globalReducer, globalSelectors };
