import { registerEvents as commandEvents } from "../commands/commandEvents";
import { registerEvents as newGameEvents } from "./newGame";
import { registerEvents as marketEvents } from "./market";

function registerEvents(store, eventBus) {
  function serviceProvider(eventHandler) {
    return event => eventHandler(store.getState(), eventBus, event);
  }

  commandEvents(eventBus, serviceProvider);
  newGameEvents(eventBus, serviceProvider);
  marketEvents(eventBus, serviceProvider);
}

export default registerEvents;
