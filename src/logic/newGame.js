import rules from "./rules";
import { NEW_GAME } from "./events";

function newGame(store, eventBus, parser) {
  function doCommand(command) {
    parser(command)(store.getState(), eventBus);
  }

  eventBus.send(NEW_GAME, {
    ...rules,
    startingCash: rules.startingCash * 10
  });

  console.log("\nWelcome to Text Elite 1.5.\n");

  doCommand("help");
}

export default newGame;
