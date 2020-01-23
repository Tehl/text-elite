import rules from "/logic/rules";
import { NEW_GAME } from "./events";
import { COMMAND_HELP } from "/logic/commands/help";
import { DISPLAY_FEEDBACK_INFO } from "/logic/events/events";

function beginNewGame(eventBus) {
  eventBus.send(NEW_GAME, {
    ...rules,
    startingCash: rules.startingCash * 10
  });
}

function onNewGameEvent(state, eventBus, event) {
  eventBus.send(DISPLAY_FEEDBACK_INFO, {
    message: "\nWelcome to Text Elite 1.5.\n"
  });
  eventBus.send(COMMAND_HELP, {});
}

function registerEvents(eventBus, serviceProvider) {
  eventBus.take(NEW_GAME, serviceProvider(onNewGameEvent));
}

export { beginNewGame };
export { registerEvents };
