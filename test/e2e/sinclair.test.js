import { expect } from "chai";
import fs from "fs";
import createEventBus from "/app/createEventBus";
import createStore from "/app/createStore";
import createParser from "/app/createParser";
import registerEvents from "/app/registerEvents";
import { beginNewGame } from "/logic/events/newGame";
import { getCash } from "/state/selectors";

describe("e2e: trading scripts", function() {
  describe("#sinclair.txt", function() {
    let commands;

    before(function() {
      const commandData = fs.readFileSync("ref/scripts/sinclair.txt", "utf8");
      commands = commandData
        .replace("\r", "")
        .split("\n")
        .map(x => x.trim())
        .filter(x => x.length && !x.startsWith("q"));
    });

    it("should achieve 1001201.2 credits", function() {
      const eventBus = createEventBus();
      const store = createStore(eventBus);
      const parser = createParser();

      registerEvents(store, eventBus, false);

      beginNewGame(eventBus);

      commands.forEach(x => {
        const command = parser(x);
        command(store.getState(), eventBus);
      });

      const cash = getCash(store.getState());

      expect(cash).to.equal(10012012);
    });
  });
});
