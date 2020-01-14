import { combineReducers } from "redux";
import { combineSelectors } from "combine-selectors-redux";
import {
  fluctuationReducer,
  selectors as fluctuationSelectors
} from "./market/fluctuation";
import {
  quantityReducer,
  selectors as quantitySelectors
} from "./market/quantity";

const marketReducer = combineReducers({
  fluctuation: fluctuationReducer,
  quantity: quantityReducer
});

const marketSelectors = combineSelectors({
  fluctuation: fluctuationSelectors,
  quantity: quantitySelectors
});

export { marketReducer, marketSelectors };
