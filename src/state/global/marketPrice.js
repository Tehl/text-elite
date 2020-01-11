import { createSelector } from "reselect";
import generateMarket from "../../logic/market/generateMarket";

// creates a state chunk representing all price data
// for the specified market
function createPriceData(marketData) {
  return Object.fromEntries(marketData.map(x => [x.commodityId, x.price]));
}

// selects the market price for a commodity from the
// priceData state chunk
function getMarketPrice(priceData, commodityId) {
  return priceData[commodityId] || 0;
}

// creates a selector which uses the currentSystem and
// market fluctuation to derive current commodity prices.
// this should be mounted on the 'global' state chunk.
function createMarketPriceSelector(globalSelectors) {
  // reselect selectors are memoised, so we only re-generate
  // our derived data when the inputs change.
  const getPriceData = createSelector(
    globalSelectors.world.getGalaxyInfo,
    globalSelectors.world.currentSystem.getCurrentSystem,
    globalSelectors.market.fluctuation.getMarketFluctuation,
    (galaxy, currentSystem, fluctuation) => {
      const systemInfo = galaxy[currentSystem];
      const marketData = generateMarket(systemInfo, fluctuation);
      return createPriceData(marketData);
    }
  );

  // the memoised selector cannot accept additional arguments
  // other than the base state, so we need to fetch the full
  // price chunk and then perform a secondary select to
  // get the final value that we need
  return (state, commodityId) =>
    getMarketPrice(getPriceData(state), commodityId);
}

export default createMarketPriceSelector;
