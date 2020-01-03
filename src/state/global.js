import { combineReducers } from "redux";
import { combineSelectors } from "combine-selectors-redux";
import { playerReducer, playerSelectors } from "./player";
import { worldReducer, worldSelectors } from "./world";

const globalReducer = combineReducers({
  player: playerReducer,
  world: worldReducer
});

const globalSelectors = combineSelectors({
  player: playerSelectors,
  world: worldSelectors
});

export { globalReducer, globalSelectors };
