import { registerEvents as newGameEvents } from "./newGame";
import { registerEvents as marketEvents } from "./market";

function registerEvents(eventBus, serviceProvider) {
  newGameEvents(eventBus, serviceProvider);
  marketEvents(eventBus, serviceProvider);
}

export { registerEvents };
