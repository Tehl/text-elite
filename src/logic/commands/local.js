import {
  getCurrentSystem,
  getGalaxyInfo,
  getFuel
} from "../../state/selectors";
import { getShortSystemInfo } from "../world/systemInfo";
import { distanceBetween } from "../world/navigation";
import rules from "../rules";

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
    const distance = x.distance / 10;
    return ` ${inRange} ${info} (${distance.toFixed(1)} LY)`;
  });

  localSystemInfo.forEach(x => console.log(x));
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
