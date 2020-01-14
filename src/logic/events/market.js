import { NEW_GAME, MARKET_UPDATED, JUMP_TO_SYSTEM } from "./events";
import {
  getCurrentSystem,
  getGalaxyInfo,
  getMarketSeed
} from "../../state/selectors";
import generateMarket from "../market/generateMarket";
import { getFluctuation, seedFluctuation } from "../market/fluctuation";

function onGenerateMarketEvent(state, eventBus, fluctuation, seed) {
  const galaxy = getGalaxyInfo(state);
  const currentSystem = galaxy[getCurrentSystem(state)];

  const marketData = generateMarket(currentSystem, fluctuation);

  eventBus.send(MARKET_UPDATED, {
    fluctuation,
    marketSeed: seed,
    commodites: marketData
  });
}

function onGenerateMarketForNewGame(state, eventBus, event) {
  onGenerateMarketEvent(
    state,
    eventBus,
    event.startingMarketFluctuation,
    seedFluctuation(event.startingMarketSeed)
  );
}

function onGenerateMarketForSystemChange(state, eventBus, event) {
  const initialSeed = getMarketSeed(state);
  const { fluctuation, nextSeed } = getFluctuation(initialSeed);

  onGenerateMarketEvent(state, eventBus, fluctuation, nextSeed);
}

function registerEvents(eventBus, serviceProvider) {
  eventBus.take(NEW_GAME, serviceProvider(onGenerateMarketForNewGame));
  eventBus.take(
    JUMP_TO_SYSTEM,
    serviceProvider(onGenerateMarketForSystemChange)
  );
}

export { registerEvents };
