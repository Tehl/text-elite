import { combineReducers } from "redux";
import { combineSelectors } from "combine-selectors-redux";
import {
  fluctuationReducer,
  selectors as fluctuationSelectors
} from "./market/fluctuation";

const marketReducer = combineReducers({
  fluctuation: fluctuationReducer
});

const marketSelectors = combineSelectors({
  fluctuation: fluctuationSelectors
});

export { marketReducer, marketSelectors };
