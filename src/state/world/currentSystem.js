import { NEW_GAME, JUMP_TO_SYSTEM } from "../../logic/events/events";

const defaultValue = 0;

function currentSystemReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.startingSystem;

    case JUMP_TO_SYSTEM:
      return action.targetSystem;

    default:
      return state;
  }
}

function getCurrentSystem(state) {
  return state;
}

export { currentSystemReducer };

export const selectors = { getCurrentSystem };
