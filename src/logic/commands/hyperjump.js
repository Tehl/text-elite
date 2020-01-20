import { getCurrentGalaxy } from "../../state/selectors";
import { JUMP_TO_GALAXY } from "../events/events";
import rules from "../rules";

const COMMAND_HYPER_JUMP = "COMMAND_HYPER_JUMP";

function onHyperJumpCommand(state, eventBus, event) {
  const currentGalaxy = getCurrentGalaxy(state);

  let nextGalaxy = currentGalaxy + 1;
  if (nextGalaxy > rules.galaxyCount) {
    nextGalaxy = 1;
  }

  eventBus.send(JUMP_TO_GALAXY, {
    target: nextGalaxy
  });
}

export const commandParser = {
  name: "galhyp",
  createCommand: args => (state, eventBus) => {
    eventBus.send(COMMAND_HYPER_JUMP, {});
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_HYPER_JUMP, serviceProvider(onHyperJumpCommand));
};
