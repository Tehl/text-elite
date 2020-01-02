import gameLoop from "./gameLoop";
import createEventBus from "./createEventBus";
import createStore from "./createStore";
import createParser from "./createParser";

const eventBus = createEventBus();
const store = createStore(eventBus);
const parser = createParser();

gameLoop(store, eventBus, parser);
