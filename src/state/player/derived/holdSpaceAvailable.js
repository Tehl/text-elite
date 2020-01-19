import { createSelector } from "reselect";

// creates a selector which uses the hold size and
// the used hold space to derive the available hold space.
// this should be mounted on the 'player' state chunk.
function createHoldSpaceAvailableSelector(playerSelectors) {
  // reselect selectors are memoised, so we only re-generate
  // our derived data when the inputs change.
  return createSelector(
    playerSelectors.holdSize.getHoldSize,
    playerSelectors.getHoldSpaceUsed,
    (holdSize, spaceUsed) => {
      return holdSize - spaceUsed;
    }
  );
}

export default createHoldSpaceAvailableSelector;
