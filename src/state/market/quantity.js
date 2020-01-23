import {
  MARKET_UPDATED,
  BUY_FROM_MARKET,
  SELL_TO_MARKET
} from "/logic/events/events";
import { fromEntries } from "/utility/object";

const defaultValue = {};

function quantityReducer(state = defaultValue, action) {
  switch (action.type) {
    case MARKET_UPDATED:
      return fromEntries(
        action.commodites.map(x => [x.commodityId, x.quantity])
      );

    case BUY_FROM_MARKET:
      return {
        ...state,
        [action.commodityId]: (state[action.commodityId] || 0) - action.quantity
      };

    case SELL_TO_MARKET:
      return {
        ...state,
        [action.commodityId]: (state[action.commodityId] || 0) + action.quantity
      };

    default:
      return state;
  }
}

function getMarketQuantity(state, commodityId) {
  return state[commodityId] || 0;
}

export { quantityReducer };

export const selectors = { getMarketQuantity };
