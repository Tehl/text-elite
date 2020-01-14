import { MARKET_UPDATED } from "../../logic/events/events";
import { fromEntries } from "../../utility/object";

const defaultValue = {};

function quantityReducer(state = defaultValue, action) {
  switch (action.type) {
    case MARKET_UPDATED:
      return fromEntries(
        action.commodites.map(x => [x.commodityId, x.quantity])
      );

    default:
      return state;
  }
}

function getMarketQuantity(state, commodityId) {
  return state[commodityId] || 0;
}

export { quantityReducer };

export const selectors = { getMarketQuantity };
