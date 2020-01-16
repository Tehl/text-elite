import { NEW_GAME, JUMP_TO_SYSTEM } from "../../logic/events/events";

const defaultValue = 0;

function fuelReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.startingFuel;

    case JUMP_TO_SYSTEM:
      return state - action.fuelCost;

    default:
      return state;
  }
}

function getFuel(state) {
  return state;
}

export { fuelReducer };

export const selectors = { getFuel };
