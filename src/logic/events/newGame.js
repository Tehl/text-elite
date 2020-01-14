import rules from "../rules";
import { NEW_GAME } from "./events";
import { COMMAND_HELP } from "../commands/help";

function beginNewGame(eventBus) {
  eventBus.send(NEW_GAME, {
    ...rules,
    startingCash: rules.startingCash * 10
  });
}

function onNewGameEvent(state, eventBus, event) {
  console.log("\nWelcome to Text Elite 1.5.\n");
  eventBus.send(COMMAND_HELP, {});
}

function registerEvents(eventBus, serviceProvider) {
  eventBus.take(NEW_GAME, serviceProvider(onNewGameEvent));
}

export { beginNewGame };
export { registerEvents };
