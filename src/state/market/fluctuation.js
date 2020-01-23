import { MARKET_UPDATED } from "/logic/events/events";

const defaultValue = {
  current: 0,
  seed: 0
};

function fluctuationReducer(state = defaultValue, action) {
  switch (action.type) {
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
