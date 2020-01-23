import { getCurrentSystem, getGalaxyInfo, getFuel } from "/state/selectors";
import { findNearestByName, distanceBetween } from "/logic/world/navigation";
import { DISPLAY_FEEDBACK_FAILURE, JUMP_TO_SYSTEM } from "/logic/events/events";
import { COMMAND_INFO } from "./info";

const COMMAND_JUMP = "COMMAND_JUMP";

function onJumpCommand(state, eventBus, event) {
  const galaxy = getGalaxyInfo(state);
  const currentSystem = galaxy[getCurrentSystem(state)];

  let targetSystem;
  if (event.systemName) {
    targetSystem = findNearestByName(galaxy, currentSystem, event.systemName);
  }

  if (!targetSystem || targetSystem.systemId === currentSystem.systemId) {
    eventBus.send(DISPLAY_FEEDBACK_FAILURE, { message: "Bad jump" });
    return;
  }

  const distance = distanceBetween(currentSystem, targetSystem);

  if (!event.sneak) {
    const fuel = getFuel(state);
    if (distance > fuel) {
      eventBus.send(DISPLAY_FEEDBACK_FAILURE, { message: "Jump to far" });
      return;
    }
  }

  eventBus.send(JUMP_TO_SYSTEM, {
    targetSystem: targetSystem.systemId,
    fuelCost: event.sneak ? 0 : distance
  });
  eventBus.send(COMMAND_INFO, {});
}

export { COMMAND_JUMP };

export const commandParser = {
  name: "jump",
  createCommand: args => (state, eventBus) => {
    eventBus.send(COMMAND_JUMP, { systemName: args });
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_JUMP, serviceProvider(onJumpCommand));
};
