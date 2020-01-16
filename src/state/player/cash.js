import { NEW_GAME, PURCHASE_FUEL } from "../../logic/events/events";

const PLAYER_GAINED_CASH = "PLAYER_GAINED_CASH";

const defaultValue = 0;

function cashReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.startingCash;

    case PURCHASE_FUEL:
      return state - action.fuelPrice;

    case PLAYER_GAINED_CASH:
      return state + action.value;

    default:
      return state;
  }
}

function getCash(state) {
  return state;
}

export { PLAYER_GAINED_CASH };

export { cashReducer };

export const selectors = { getCash };
