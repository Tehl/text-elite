import { NEW_GAME, SET_HOLD_SIZE } from "/logic/events/events";

const defaultValue = 0;

function holdSizeReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.startingHoldSize;

    case SET_HOLD_SIZE:
      return action.value;

    default:
      return state;
  }
}

function getHoldSize(state) {
  return state;
}

export { holdSizeReducer };

export const selectors = { getHoldSize };
