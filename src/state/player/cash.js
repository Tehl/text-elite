import { NEW_GAME } from "../../logic/events/events";

const PLAYER_GAINED_CASH = "PLAYER_GAINED_CASH";
const PLAYER_LOST_CASH = "PLAYER_LOST_CASH";

const defaultValue = 0;

function cashReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.startingCash;

    case PLAYER_GAINED_CASH:
      return state + action.value;

    case PLAYER_LOST_CASH:
      return state - action.value;

    default:
      return state;
  }
}

function getCash(state) {
  return state;
}

export { PLAYER_GAINED_CASH, PLAYER_LOST_CASH };

export { cashReducer };

export const selectors = { getCash };
