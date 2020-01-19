import { combineReducers } from "redux";
import { combineSelectors } from "combine-selectors-redux";
import { cashReducer, selectors as cashSelectors } from "./player/cash";
import { fuelReducer, selectors as fuelSelectors } from "./player/fuel";
import {
  holdSizeReducer,
  selectors as holdSizeSelectors
} from "./player/holdSize";
import {
  inventoryReducer,
  selectors as inventorySelectors
} from "./player/inventory";
import createHoldSpaceUsedSelector from "./player/derived/holdSpaceUsed";
import createHoldSpaceAvailableSelector from "./player/derived/holdSpaceAvailable";

const playerReducer = combineReducers({
  cash: cashReducer,
  fuel: fuelReducer,
  holdSize: holdSizeReducer,
  inventory: inventoryReducer
});

const playerSelectors = combineSelectors({
  cash: cashSelectors,
  fuel: fuelSelectors,
  holdSize: holdSizeSelectors,
  inventory: inventorySelectors
});

playerSelectors.getHoldSpaceUsed = createHoldSpaceUsedSelector(playerSelectors);
playerSelectors.getHoldSpaceAvailable = createHoldSpaceAvailableSelector(
  playerSelectors
);

export { playerReducer, playerSelectors };
