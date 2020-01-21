import { registerEvents as displayEvents } from "./display";

function registerEvents(eventBus, serviceProvider, withUi) {
  if (withUi) {
    displayEvents(eventBus, serviceProvider);
  }
}

export { registerEvents };
