import { createSelector } from "reselect";
import buildGalaxy from "/logic/worldGen/buildGalaxy";

// creates a selector which uses the currentGalaxy
// to derive the galaxy model.
// this should be mounted on the 'world' state chunk.
function createGalaxyInfoSelector(worldSelectors) {
  // reselect selectors are memoised, so we only re-generate
  // our derived data when the inputs change
  return createSelector(
    worldSelectors.currentGalaxy.getCurrentGalaxy,
    currentGalaxy => buildGalaxy(currentGalaxy)
  );
}

export default createGalaxyInfoSelector;
