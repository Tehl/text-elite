import { NEW_GAME } from "../../logic/events";

const PLAYER_GAINED_FUEL = "PLAYER_GAINED_FUEL";
const PLAYER_LOST_FUEL = "PLAYER_LOST_FUEL";

const defaultValue = 0;

function fuelReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.startingFuel;

    case PLAYER_GAINED_FUEL:
      return state + action.value;

    case PLAYER_LOST_FUEL:
      return state - action.value;

    default:
      return state;
  }
}

function getFuel(state) {
  return state;
}

export { PLAYER_GAINED_FUEL, PLAYER_LOST_FUEL };

export { fuelReducer };

export const selectors = { getFuel };
