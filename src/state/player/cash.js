import { NEW_GAME, BUY_FUEL, ADD_CASH } from "../../logic/events/events";

const defaultValue = 0;

function cashReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.startingCash;

    case BUY_FUEL:
      return state - action.fuelPrice;

    case ADD_CASH:
      return state + action.value;

    default:
      return state;
  }
}

function getCash(state) {
  return state;
}

export { cashReducer };

export const selectors = { getCash };
