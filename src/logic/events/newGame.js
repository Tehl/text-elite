import rules from "../rules";
import { NEW_GAME } from "./events";

function beginNewGame(eventBus) {
  eventBus.send(NEW_GAME, {
    ...rules,
    startingCash: rules.startingCash * 10
  });
}

function onNewGameEvent(state, eventBus, event) {
  console.log("\nWelcome to Text Elite 1.5.\n");
}

function registerEvents(eventBus, serviceProvider) {
  eventBus.take(NEW_GAME, serviceProvider(onNewGameEvent));
}

export { beginNewGame };
export { registerEvents };
