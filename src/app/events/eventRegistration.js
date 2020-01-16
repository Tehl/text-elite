import { registerEvents as displayEvents } from "./display";

function registerEvents(eventBus, serviceProvider) {
  displayEvents(eventBus, serviceProvider);
}

export { registerEvents };
