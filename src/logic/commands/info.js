import { getCurrentSystem, getGalaxyInfo } from "../../state/selectors";
import { findNearestByName } from "../world/navigation";
import { getFullSystemInfo } from "../world/systemInfo";

export default {
  name: "info",
  createCommand: args => (state, eventBus) => {
    const galaxy = getGalaxyInfo(state);
    const currentSystem = galaxy[getCurrentSystem(state)];

    let targetSystem;
    if (args) {
      targetSystem = findNearestByName(galaxy, currentSystem, args);
    }

    if (!targetSystem) {
      targetSystem = currentSystem;
    }

    const systemInfo = getFullSystemInfo(targetSystem);

    console.log(systemInfo.join("\n"));

    return true;
  }
};
