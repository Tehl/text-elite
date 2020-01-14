import gameLoop from "./gameLoop";
import createEventBus from "./createEventBus";
import createStore from "./createStore";
import createParser from "./createParser";
import registerEvents from "../logic/events/eventManager";
import { beginNewGame } from "../logic/events/newGame";

const eventBus = createEventBus();
const store = createStore(eventBus);
const parser = createParser();

registerEvents(store, eventBus);

beginNewGame(eventBus);

gameLoop(store, eventBus, parser);
