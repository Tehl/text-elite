import { NEW_GAME, MARKET_UPDATED } from "../../logic/events";

const defaultValue = {};

function quantityReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return {};

    case MARKET_UPDATED:
      return Object.fromEntries(
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
