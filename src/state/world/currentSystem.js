import { NEW_GAME } from "../../logic/events";

const JUMP_TO_SYSTEM = "JUMP_TO_SYSTEM";

const defaultValue = 0;

function currentSystemReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.startingSystem;

    case JUMP_TO_SYSTEM:
      return action.target;

    default:
      return state;
  }
}

function getCurrentSystem(state) {
  return state;
}

export { JUMP_TO_SYSTEM };

export { currentSystemReducer };

export const selectors = { getCurrentSystem };
