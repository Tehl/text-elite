import { NEW_GAME } from "../../logic/events/events";

const JUMP_TO_GALAXY = "JUMP_TO_GALAXY";

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

export { JUMP_TO_GALAXY };

export { currentGalaxyReducer };

export const selectors = { getCurrentGalaxy };
