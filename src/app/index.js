import gameLoop from "./gameLoop";
import createEventBus from "./createEventBus";
import createStore from "./createStore";
import createParser from "./createParser";
import newGame from "../logic/newGame";

const eventBus = createEventBus();
const store = createStore(eventBus);
const parser = createParser();

newGame(store, eventBus, parser);

gameLoop(store, eventBus, parser);
