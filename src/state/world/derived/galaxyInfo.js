import { createSelector } from "reselect";
import buildGalaxy from "../../../logic/worldGen/buildGalaxy";

// creates a selector for the 'world' state chunk
// which uses the currentGalaxy value to derive
// the galaxy model.
// we use reselect to create a memoised selector
// so that the galaxy model is only re-generated
// when the currentGalaxy changes.
function createGalaxyInfoSelector(worldSelectors) {
  return createSelector(
    worldSelectors.currentGalaxy.getCurrentGalaxy,
    currentGalaxy => buildGalaxy(currentGalaxy)
  );
}

export default createGalaxyInfoSelector;
