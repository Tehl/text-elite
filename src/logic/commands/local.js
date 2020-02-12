import { getCurrentSystem, getGalaxyInfo, getFuel } from "/state/selectors";
import { getShortSystemInfo } from "/logic/world/systemInfo";
import { distanceBetween } from "/logic/world/navigation";
import { DISPLAY_FEEDBACK_INFO } from "/logic/events/events";
import rules from "/logic/rules";
import { formatDistance } from "/logic/display";

const COMMAND_LOCAL = "COMMAND_LOCAL";

function onLocalCommand(state, eventBus, event) {
  const galaxy = getGalaxyInfo(state);
  const currentSystem = galaxy[getCurrentSystem(state)];
  const currentFuel = getFuel(state);

  const localSystems = galaxy
    .map(x => ({
      system: x,
      distance: distanceBetween(currentSystem, x)
    }))
    .filter(x => x.distance <= rules.maxFuel);

  const localSystemInfo = localSystems.map(x => {
    const info = getShortSystemInfo(x.system);
    const inRange = x.distance <= currentFuel ? "*" : "-";
    return ` ${inRange} ${info} (${formatDistance(x.distance)} LY)`;
  });

  eventBus.send(DISPLAY_FEEDBACK_INFO, { message: localSystemInfo });
}

export const commandParser = {
  name: "local",
  createCommand: args => (state, eventBus) => {
    eventBus.send(COMMAND_LOCAL, {});
    return true;
  }
};

export const registerEvents = (eventBus, serviceProvider) => {
  eventBus.take(COMMAND_LOCAL, serviceProvider(onLocalCommand));
};
