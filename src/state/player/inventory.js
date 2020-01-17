import {
  NEW_GAME,
  BUY_FROM_MARKET,
  SELL_TO_MARKET
} from "../../logic/events/events";

const defaultValue = {};

function inventoryReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return {};

    case BUY_FROM_MARKET:
      return {
        ...state,
        [action.commodityId]: state[action.commodityId] + action.quantity
      };

    case SELL_TO_MARKET:
      return {
        ...state,
        [action.commodityId]: state[action.commodityId] - action.quantity
      };

    default:
      return state;
  }
}

function getInventoryQuantity(state, commodityId) {
  return state[commodityId] || 0;
}

export { inventoryReducer };

export const selectors = { getInventoryQuantity };
