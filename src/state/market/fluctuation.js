import { NEW_GAME, MARKET_UPDATED } from "../../logic/events";

const defaultValue = {
  current: 0,
  seed: 0
};

function fluctuationReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return {
        current: action.startingMarketFluctuation,
        seed: action.startingMarketSeed
      };

    case MARKET_UPDATED:
      return {
        current: action.fluctuation,
        seed: action.marketSeed
      };

    default:
      return state;
  }
}

function getMarketFluctuation(state) {
  return state.current;
}

function getMarketSeed(state) {
  return state.seed;
}

export { fluctuationReducer };

export const selectors = { getMarketFluctuation, getMarketSeed };
