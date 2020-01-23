import { createSelector } from "reselect";
import { commodities } from "/data/commodities";

// creates a selector which uses the inventory contents
// to derive the amount of hold space which has been used.
// this should be mounted on the 'player' state chunk.
function createHoldSpaceUsedSelector(playerSelectors) {
  const getInventoryQuantity = playerSelectors.inventory.getInventoryQuantity;

  // we need to select the quantity of every commodity which has
  // a volume, and transform it into the amount of space used
  // for that quantity of that commodity
  const commoditiesWithVolume = commodities.filter(x => x.volume > 0);
  const commodityVolumeSelectors = commoditiesWithVolume.map(x => state =>
    getInventoryQuantity(state, x.commodityId) * x.volume
  );

  // we spread the volume selectors over the createSelector arguments
  // since we don't know exactly how many there will be,
  // and then spread the results back into an array to calculate the sum.
  // reselect selectors are memoised, so we only re-generate
  // our derived data when the inputs change.
  return createSelector(...commodityVolumeSelectors, (...volumes) => {
    return volumes.reduce((prev, curr) => prev + curr, 0);
  });
}

export default createHoldSpaceUsedSelector;
