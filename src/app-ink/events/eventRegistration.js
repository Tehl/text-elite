import { registerEvents as commandEvents } from "./command";

function registerEvents(eventBus, serviceProvider, parser) {
  commandEvents(eventBus, serviceProvider, parser);
}

export { registerEvents };
