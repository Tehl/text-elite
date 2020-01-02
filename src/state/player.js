import { combineReducers } from "redux";
import { combineSelectors } from "combine-selectors-redux";
import { cashReducer, selectors as cashSelectors } from "./player/cash";

const playerReducer = combineReducers({
  cash: cashReducer
});

const playerSelectors = combineSelectors({
  cash: cashSelectors
});

export { playerReducer, playerSelectors };
