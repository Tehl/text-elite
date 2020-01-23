import { NEW_GAME, JUMP_TO_GALAXY } from "/logic/events/events";

const defaultValue = 0;

function currentGalaxyReducer(state = defaultValue, action) {
  switch (action.type) {
    case NEW_GAME:
      return action.startingGalaxy;

    case JUMP_TO_GALAXY:
      return action.target;

    default:
      return state;
  }
}

function getCurrentGalaxy(state) {
  return state;
}

export { currentGalaxyReducer };

export const selectors = { getCurrentGalaxy };
