import rules from "./rules";
import { PLAYER_GAINED_FUEL } from "../state/player/fuel";

function newGame(store, eventBus, parser) {
  function doCommand(command) {
    parser(command)(store.getState(), eventBus);
  }

  eventBus.send(PLAYER_GAINED_FUEL, { value: rules.maxFuel });

  doCommand("hold 20"); /* Small cargo bay */
  doCommand("cash +100"); /* 100 CR */

  console.log("\nWelcome to Text Elite 1.5.\n");

  doCommand("help");
}

export default newGame;
