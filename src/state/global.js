import { combineReducers } from "redux";
import { combineSelectors } from "combine-selectors-redux";
import { playerReducer, playerSelectors } from "./player";
import { worldReducer, worldSelectors } from "./world";
import { marketReducer, marketSelectors } from "./market";
import createMarketPriceSelector from "./global/marketPrice";

const globalReducer = combineReducers({
  player: playerReducer,
  world: worldReducer,
  market: marketReducer
});

const globalSelectors = combineSelectors({
  player: playerSelectors,
  world: worldSelectors,
  market: marketSelectors
});

globalSelectors.getMarketPrice = createMarketPriceSelector(globalSelectors);

export { globalReducer, globalSelectors };
