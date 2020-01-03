import { combineReducers } from "redux";
import { combineSelectors } from "combine-selectors-redux";
import {
  currentGalaxyReducer,
  selectors as currentGalaxySelectors
} from "./world/currentGalaxy";
import {
  currentSystemReducer,
  selectors as currentSystemSelectors
} from "./world/currentSystem";
import createGalaxyInfoSelector from "./world/derived/galaxyInfo";

const worldReducer = combineReducers({
  currentGalaxy: currentGalaxyReducer,
  currentSystem: currentSystemReducer
});

const worldSelectors = combineSelectors({
  currentGalaxy: currentGalaxySelectors,
  currentSystem: currentSystemSelectors
});

worldSelectors.getGalaxyInfo = createGalaxyInfoSelector(worldSelectors);

export { worldReducer, worldSelectors };
